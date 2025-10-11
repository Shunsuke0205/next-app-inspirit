// /app/effort/actions.ts
"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export type CommitmentType = "touched" | "completed" | "potential_miss";

type CommitmentResult = {
  success: boolean;
  error: string | null;
  committedDate: string | null;
};

/**
 * Helper function to calculate the "activity date" based on JST 4:00 AM cut-off.
 * This must match the logic in the database trigger (set_jst_committed_date).
 */
function getJstCommitDate(): string {
  const now = new Date();
  const jstTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
  const shiftedTime = new Date(jstTime);
  // Subtract 4 hours to shift the cut-off time to 4 AM JST (19:00 UTC previous day)
  shiftedTime.setHours(jstTime.getHours() - 4);
  
  // Format as "YYYY-MM-DD"
  return shiftedTime.toISOString().substring(0, 10);
}


/**
 * Records a commitment (or attempts to update an existing one) in the student_commitments table.
 * @param applicationId - The ID of the scholarship application being committed to.
 * @param commitmentType - The type of commitment ("touched", "completed", "potential_miss").
 * @returns Success status and error message.
 */
export async function recordCommitment(
  applicationId: string,
  commitmentType: CommitmentType
): Promise<CommitmentResult> {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  
  if (userError || !userData.user) {
    return { success: false, error: "User not authenticated", committedDate: null };
  }
  const userId = userData.user.id;

  // ------------------------------------------------------------------
  // 1. Check for existing commitment for the day (SELECT)
  // ------------------------------------------------------------------
  const { data: existingCommitment, error: selectError } = await supabase
    .from("student_commitments")
    .select("id, commitment_type")
    .eq("user_id", userId)
    .eq("application_id", applicationId)
    .eq("committed_date_jst", getJstCommitDate())
    .single();

  // Handle case where row is simply not found (PGRST116)
  if (selectError && selectError.code !== "PGRST116") {
      console.error("SELECT ERROR:", selectError.message);
      return { success: false, error: "Database query error: " + selectError.message, committedDate: null };
  }


  // ------------------------------------------------------------------
  // 2. Handle Existing Commitments (UPDATE or Reject)
  // ------------------------------------------------------------------
  if (existingCommitment) {
    const existingType: CommitmentType = existingCommitment.commitment_type as CommitmentType;

    // Scenario A: Reject changes that are not allowed
    if (existingType === "touched" || existingType === "completed" || existingType === commitmentType) {
        return { success: false, error: "Commitment already finalized or no change necessary.", committedDate: null };
    }

    // Scenario B: Allow upgrade from "potential_miss" to "touched"
    if (existingType === "potential_miss" && commitmentType === "touched") {
      const { error: updateError } = await supabase
        .from("student_commitments")
        .update({ commitment_type: commitmentType })
        .eq("id", existingCommitment.id);

      if (updateError) {
        console.error("UPDATE ERROR (Upgrade):", updateError.message);
        return { success: false, error: "Database update failed: " + updateError.message, committedDate: null };
      }
        
      revalidatePath("/app/effort");
      return { success: true, error: null, committedDate: new Date().toISOString() };
    }

    // Reject any other type of "potential_miss" update (e.g., potential_miss -> potential_miss)
    return { success: false, error: "Update logic failed or unauthorized change.", committedDate: null };
  }
  // Commitment has not been made yet for today, proceed to INSERT

  // ------------------------------------------------------------------
  // 3. Handle New Commitment (INSERT)
  // ------------------------------------------------------------------
  const { error: insertError } = await supabase
    .from("student_commitments")
    .insert({
      user_id: userId,
      application_id: applicationId,
      commitment_type: commitmentType,
    });

  if (insertError) {
    console.error("INSERT ERROR:", insertError.message);
    return { success: false, error: "Database insert error: " + insertError.message, committedDate: null };
  } else {
    revalidatePath("/app/effort");
    return { success: true, error: null, committedDate: new Date().toISOString() };
  }
};
