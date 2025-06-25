import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

async function MyApplications() {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData) {
    console.error("Error fetching user data:", userError);
    redirect("/login");
  }

  const userId = userData.user?.id;

  const { data: studentAuthData, error: studentAuthError } = await supabase
    .from("student_authorizations")
    .select("is_verified, is_banned")
    .eq("user_id", userId)
    .single();

  if (studentAuthError || !studentAuthData) {
    console.error("Error fetching student authorization data:", studentAuthError);
    return (
      <div>
        アカウントの取得に失敗しました。申し訳ありませんが、ログインし直してください。
      </div>
    )
  } else if (!studentAuthData.is_verified) {
    console.error("User is not verified");
    return (
      <div>
        アカウントが認証されていません。お手数おかけしますが、学生情報を提出して認証を完了してください。
      </div>
    )
  } else if (studentAuthData.is_banned) {
    console.error("User is banned");
    return (
      <div>
        申し訳ありませんが、活動報告が不十分だったため、アカウントが停止されました。
      </div>
    )
  }
  
  const { data: applicationsData, error: applicationsError } = await supabase
    .from("scholarship_applications")
    .select("id, title, status, created_at, item_description")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (applicationsError) {
    console.error("Error fetching applications data:", applicationsError);
    return (
      <div>
        申し訳ありませんが、申請情報の取得に失敗しました。後ほど再度お試しください。
      </div>
    );
  }

  if (!applicationsData || applicationsData.length === 0) {
    return (
      <div>
        現在、申請はありません。新しい申請を作成してください。
      </div>
    );
  }

  return (
    <div>
      <h2>申請一覧</h2>
      <ul>
        {applicationsData.map((application) => (
          <Link key={application.id} href={`/bright-first-step/${application.id}`}>
            <li>
              <h3>{application.title}</h3>
              <p>ステータス: {application.status}</p>
              <p>作成日時: {new Date(application.created_at).toLocaleDateString()}</p>
              <p>アイテム説明: {application.item_description}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

const Page = () => {
  return (
    <div>
      <div>
        bright-first-step Page

      </div>
      <MyApplications />
    </div>
  );
};

export default Page;
