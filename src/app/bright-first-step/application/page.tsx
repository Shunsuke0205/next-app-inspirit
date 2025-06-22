"use client";

import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";

const useAuthorization = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthorization = async () => {
      const supabase = await createClient();
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError || !userData.user) {
        console.error("User not logged in or error fetching user:", userError?.message || "User not found.");
        setError("ログインが必要です。");
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      const { data: studentAuthData, error: studentAuthError } = await supabase
        .from("student_authorizations")
        .select("is_verified, is_banned")
        .eq("user_id", userData.user.id)
        .single();

      if (studentAuthError || !studentAuthData) {
        console.error("Error fetching student authorization data:", studentAuthError?.message);
        setError("ユーザーの情報が見つかりませんでした。");
        setIsAuthorized(false);
      } else if (!studentAuthData.is_verified) {
        console.error("User is not a verified student.");
        setError("本人確認が完了していないため、投稿していただくことができません。まずは本人確認を行ってください。");
        setIsAuthorized(false);
      } else if (studentAuthData.is_banned) {
        console.error("User is banned.");
        setError("アカウントが停止されています。投稿できません。");
        setIsAuthorized(false);
      } else {
        setIsAuthorized(true);
      }
      setIsLoading(false);
    };

    checkAuthorization();
  }, []);
  
  return { isAuthorized, isLoading, error };
}

const Page = () => {
  const { isAuthorized, isLoading, error } = useAuthorization();

  if (isLoading) {
    return <div>認証状態を確認中...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!isAuthorized) {
    // 認可されていない場合の表示（エラーメッセージはuseAuthorizationで既に表示済み）
    return (
      <div>
        <p>このページにアクセスする権限がありません。</p>
        {/* 必要であれば、ログインページへのリンクなどをここに表示 */}
      </div>
    );
  }

  return (
    <div>
      <h1>偉大な最初の一歩を踏み出しましょう！</h1>
      <p>あなたの夢や目標を投稿して、支援を募りましょう。</p>
      {/* ここに投稿フォームのコンポーネントを配置 */}
    </div>
  );
};

export default Page;
