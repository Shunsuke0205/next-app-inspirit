import { createClient } from "@/utils/supabase/server";
import React from "react";
import CommitmentButton from "./commitmentButton";

function getJstCommitDate(): string {
  const now = new Date();
  const jstTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
  const shiftedTime = new Date(jstTime);
  // Subtract 4 hours to shift the cut-off time to 4 AM JST (19:00 UTC previous day)
  shiftedTime.setHours(jstTime.getHours() - 4);
  
  // Format as "YYYY-MM-DD"
  return shiftedTime.toISOString().substring(0, 10);
}

export default async function CommitmentButtonList({ applications } : { applications: { id: string; title: string }[] }) {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData?.user) {
    console.error("Error fetching user:", userError);
    return <div>申し訳ございません。ユーザの情報を取得できませんでした</div>;
  }

  const userId = userData.user.id;
  const { data: todayCommitmentsData, error: todayCommitmentsError } = await supabase
    .from("student_commitments")
    .select("application_id, commitment_type")
    .eq("user_id", userId)
    .eq("committed_date_jst", getJstCommitDate());

  if (todayCommitmentsError) {
    console.error("Error fetching today's commitments:", todayCommitmentsError);
    return <div>申し訳ございません。今日のコミットメント情報を取得できませんでした</div>;
  }

  console.log("Today's Commitments Data:", todayCommitmentsData);

  const toCommitmentCounts = applications.filter(app => !todayCommitmentsData?.some(c => c.application_id === app.id)).length;

  return (
    <div>
      <div className="p-5 bg-white shadow-xl rounded-xl space-y-5 border-t-4 border-indigo-500">
        <h2 className="text-xl font-bold text-gray-700">本日報告すべき商品 ({toCommitmentCounts} 件)</h2>
      </div>


      {applications.map((app) => {
        if (todayCommitmentsData?.some(c => c.application_id === app.id && c.commitment_type !== "potential_miss")) {
          return null; // Skip rendering this application
        }
        return (
          <div key={app.id} className="mb-6 last:mb-0">
            <CommitmentButton application={{
              id: app.id,
              title: app.title,
              commitmentType: todayCommitmentsData?.find(c => c.application_id === app.id)?.commitment_type || null
            }} />
          </div>
        );
      })}
    </div>
  );
};
