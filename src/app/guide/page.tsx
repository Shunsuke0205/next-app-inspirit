import Link from "next/link";
import React from "react";

export default function GuidePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-lg shadow-xl p-8 space-y-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 leading-tight">
          未来への第一歩を踏み出そう！
        </h1>
        <p className="text-gray-600">
          このアプリは、あなたの夢を応援する市民とあなたをつなぐプラットフォームです。
          使い方とルールを理解して、さっそくスタートしましょう！
        </p>

        {/* ステップ1: 本人確認 */}
        <div className="space-y-2">
          <h2 className="mt-12 text-2xl font-bold text-gray-800 flex items-center">
            <span className="bg-indigo-600 text-white w-8 h-8 flex items-center justify-center rounded-full mr-4">1</span>
            本人確認を完了する
          </h2>
          <p className="text-gray-700">
            安全なプラットフォームを保つため、全ての高校生に本人確認をお願いしています。
            確認が完了すると、あなたの投稿には「認証マーク」がつき、投稿が可能になります。
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>本人確認が完了すると、日々の活動報告を管理するダミーの記録が自動で作成されます。</li>
          </ul>
        </div>

        {/* ステップ2: 夢の投稿をする */}
        <div className="space-y-3">
          <h2 className="mt-12 text-2xl font-bold text-gray-800 flex items-center">
            <span className="bg-indigo-600 text-white w-8 h-8 flex items-center justify-center rounded-full mr-4">2</span>
            欲しい物の投稿をしよう
          </h2>
          <p className="text-gray-700">
            あなたの欲しい物を、支援者に伝わるように具体的に投稿しましょう。
            希望する物品の金額や、それを手に入れたあとの活動への意気込みを詳しく書くのがポイントです。
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>投稿できるのは、本人確認が済んだ高校生のアカウントのみです。</li>
            <li>応援者があなたの欲しい物を代理購入するために、「Amazonの欲しいものリスト機能」を使います。</li>
            <ul>
              <li className="font-bold">「Amazon　欲しいものリスト　匿名　作り方」などとネット検索をして、AmazonのURLを作ってください。</li>
              <li>このとき、自分の本名が公開されないよう十分注意してください！</li>
            </ul>
            <li>「活動報告期間」を決めます。</li>
            <ul>
              <li>活動報告期間とは、物品を代理購入された日から、この日数の間は毎日今日の活動を報告するという約束です。</li>
              <li>活動報告は必ずしも購入された物品と関連している必要はありません。例えば本を買ってもらったとしても、本とは関係がない活動報告（部活の話や、家族、友だちと遊んだ話など）をしてもOKです。</li>
            </ul>
            <li>「報告頻度」も決めます。</li>
            <ul>
              <li>報告頻度とは、買ってもらった物品に直接関係する活動報告を、何日間に少なくとも一回は行うという約束です。</li>
              <li>例えば報告頻度を5日に設定して本を買ってもらった場合、本を読んだことの報告を最後にした時刻から数えて丸5日間が経過したとき、ルール違反として警告1回となります。</li>
            </ul>
          </ul>
          <Link href="/bright-first-step/application" target="_blank" rel="noopener noreferrer">
            <button className="px-6 py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition cursor-pointer">
              新しい投稿を作成する
            </button>
          </Link>
        </div>

        {/* ステップ3: 活動報告の義務 */}
        <div className="space-y-3">
          <h2 className="mt-12 text-2xl font-bold text-gray-800 flex items-center">
            <span className="bg-indigo-600 text-white w-8 h-8 flex items-center justify-center rounded-full mr-4">3</span>
            活動報告を続けよう
          </h2>
          <p className="text-gray-700">
            物が贈られると、毎日報告をする義務が発生します。
            あなたの活動が支援者の「応援してよかった」という気持ちにつながります。
            また、継続的な活動報告はあなたの努力の証明となり、次の代理購入のための信頼になります。
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>毎日1回以上の活動報告が必要です。</li>
            <ul>
              <li>活動報告は必ずしも購入された物品と関連している必要はありません。例えば本を買ってもらったとしても、本とは関係がない活動報告（部活の話や、家族、友だちと遊んだ話など）をしてもOKです。</li>
            </ul>
            <li>報告頻度も守りましょう。</li>
            <ul>
              <li>報告頻度とは、買ってもらった物品に直接関係する活動報告を、何日間に少なくとも一回は行うという約束です。</li>
              <li>例えば本を買ってもらって、報告頻度を5日に設定した場合、本を読んだことの報告を最後にした時刻から数えて丸5日間が経過したとき、ルール違反として警告1回となります。</li>
            </ul>
          </ul>
          <Link href="/activity-report/post" target="_blank" rel="noopener noreferrer">
            <button className="px-6 py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition cursor-pointer">
              活動報告をする
            </button>
          </Link>
        </div>
      </div>
      
      {/* 警告と強制退会のルール */}

      <div className="text-center mt-8 text-gray-500 text-sm">
        <p>ご不明な点はメールでお問い合わせください。</p>
        <p>メールアドレス: en4singleparents@gmail.com</p>
      </div>
    </div>
  );
};
