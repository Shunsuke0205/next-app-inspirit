import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import CommitmentButtonList from "./commitmentButtonList";
import { redirect } from "next/navigation";


// コミットカレンダーデータの型
type CommitData = {
  date: string; 
  count: number;
};



// サンプルデータ: コミットメント履歴 (変更なし)
const SAMPLE_COMMIT_HISTORY: CommitData[] = [
    { date: "2025-10-01", count: 1 },
    { date: "2025-10-02", count: 2 },
    { date: "2025-10-04", count: 2 },
    { date: "2025-10-05", count: 2 },
    { date: "2025-10-06", count: 2 },
    { date: "2025-10-07", count: 2 },
    { date: "2025-10-08", count: 1 },
    { date: "2025-10-09", count: 1 },
    { date: "2025-10-10", count: 1 },
    { date: "2025-10-11", count: 1 },
    { date: "2025-10-12", count: 1 },
    { date: "2025-10-13", count: 1 },
];

// ------------------------------------

/**
 * コミットメントボタンとカレンダーを表示するページ
 */
export default async function MyActivityReportsPage() {
  const supabase = await createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    console.error("User not authenticated:", userError?.message);
    redirect("/login");
  }

  const userId = userData.user?.id;

  {
    const { data: studentAuthData, error: studentAuthError } = await supabase
      .from("student_authorizations")
      .select("is_verified, is_banned")
      .eq("user_id", userId)
      .single();

    if (studentAuthError) {
      console.error("Error fetching student authorization data:", studentAuthError?.message);
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-red-600 mb-4">アカウントの取得に失敗しました。</h1>
            <p className="text-gray-700">申し訳ありませんが、ログインし直してください。</p>
          </div>
        </div>
      );
    } else if (!studentAuthData?.is_verified) {
      console.error("User is not verified");
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-red-600 mb-4">アカウントが認証されていません。</h1>
            <p className="text-gray-700">お手数おかけしますが、学生情報を提出して認証を完了してください。</p>
            <Link href="/" className="mt-6 inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
              ホームに戻る
            </Link>
          </div>
        </div>
      );
    } else if (studentAuthData.is_banned) {
      console.error("User is banned");
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-red-600 mb-4">アカウントが停止されています。</h1>
            <p className="text-gray-700">申し訳ありませんが、活動報告が不十分だったため、アカウントが停止されています。</p>
            <Link href="/" className="mt-6 inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
              ホームに戻る
            </Link>
          </div>
        </div>
      );
    }   
  }

  const { data: reportingApplicationData, error: reportingApplicationError } = await supabase
    .from("scholarship_applications")
    .select("id, title")
    .eq("user_id", userId)
    .eq("status", "reporting");

  if (reportingApplicationError || !reportingApplicationData) {
    console.error("Error fetching reporting applications:", reportingApplicationError?.message);
  }

  // console.log("reportingApplicationData:", reportingApplicationData);
  
  if (reportingApplicationData && reportingApplicationData.length === 0) {
    console.log("No reporting applications found.");
  }

 

  // ------------------------------------
  // コミットカレンダーの描画ロジック (変更なし)
  // ------------------------------------
  const renderCommitCalendar = () => {
    const today = new Date("2025-10-05"); // デモ表示のための現在日付の仮設定
    const calendarDays = [];
    const commitMap = new Map(SAMPLE_COMMIT_HISTORY.map(item => [item.date, item.count]));

    for (let i = 29; i >= 0; i--) {
        const day = new Date(today);
        day.setDate(today.getDate() - i);
        const dateStr = day.toISOString().substring(0, 10);
        const count = commitMap.get(dateStr) || -1; 

        let colorClass = "bg-gray-200"; 

        if (count > 0) {
            colorClass = "bg-orange-600"; // 濃いオレンジ
        } else if (count === 0) {
            colorClass = "bg-yellow-300"; // 薄いオレンジ
        } else {
             colorClass = "bg-gray-100 border border-gray-300"; // 未ログイン/未アクセス (白)
        }

        calendarDays.push(
            <div key={dateStr} 
                 title={`${dateStr}: ${count > 0 ? `${count} commits` : (count === 0 ? "Logged in, no commit" : "No login")}`}
                 className={`w-4 h-4 rounded-sm transition-colors ${colorClass}`}
            ></div>
        );
    }
    return (
        <div className="grid grid-cols-7 gap-1 p-3 border border-gray-300 rounded-lg">
            {calendarDays}
        </div>
    );
  };
  // ------------------------------------

  return (
    <div className="container mx-auto p-4 max-w-xl space-y-8">
      <h1 className="text-3xl font-extrabold text-gray-800 text-center">
        🔥 今日のコミットメント
      </h1>
      <p className="text-sm text-gray-600 text-center">
        報告義務のある商品について、今日の活動を記録しましょう。
      </p>


      {reportingApplicationData && reportingApplicationData.length > 0 && <CommitmentButtonList applications={reportingApplicationData} />}






      {/* コミットメントカレンダーエリア (変更なし) */}
      <div className="p-5 bg-white shadow-xl rounded-xl space-y-4">
        <h2 className="text-xl font-bold text-gray-700">継続カレンダー</h2>
        <p className="text-xs text-gray-500">（過去30日間の活動実績）</p>
        {renderCommitCalendar()}
        <div className="flex justify-between text-xs text-gray-500 pt-2">
            <span>{new Date("2025-09-15").toLocaleDateString("ja-JP")}</span>
            <span>{new Date("2025-10-15").toLocaleDateString("ja-JP")}</span>
        </div>
        <div className="flex items-center gap-2 pt-2 flex-wrap">
            <div className="w-3 h-3 bg-orange-600 rounded-sm"></div>
            <span className="text-xs text-gray-600">コミットメントあり</span>
            <div className="w-3 h-3 bg-yellow-300 ml-4 rounded-sm"></div>
            <span className="text-xs text-gray-600">ログインしたがコミットなし</span>
            <div className="w-3 h-3 bg-gray-100 ml-4 rounded-sm border border-gray-300"></div>
            <span className="text-xs text-gray-600">未アクセス/未報告</span>
        </div>
      </div>
      
    </div>
  );
};
