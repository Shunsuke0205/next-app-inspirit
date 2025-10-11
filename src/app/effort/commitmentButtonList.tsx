import { createClient } from "@/utils/supabase/server";
import React from "react";
import CommitmentButton from "./commitmentButton";
import { getJstCommitDate } from "./jstDateUtils";
import { redirect } from "next/navigation";


export default async function CommitmentButtonList({ applications } : { applications: { id: string; title: string }[] }) {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData?.user) {
    console.error("Error fetching user:", userError);
    redirect("/login");
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
