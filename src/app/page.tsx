import Link from "next/link";
import React from "react";

/**
 * 学生アプリのホーム画面コンポーネント。
 * 主な機能ページへのナビゲーションリンクを提供します。
 */
const StudentHomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      {/* ページのメインタイトル */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 text-center leading-tight tracking-tight drop-shadow-sm">
        あなたの学びを、もっと。
        <br />
        未来へ繋ぐ学生アプリ
      </h1>

      {/* ページの簡単な説明 */}
      <p className="text-md sm:text-lg text-gray-700 mb-12 text-center max-w-3xl">
        ここでは、あなたの夢の投稿管理や、日々の活動報告ができます。
        さあ、あなたの「学び」をさらに加速させましょう。
      </p>

      {/* 主要機能へのナビゲーションカード */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl px-4">
        {/* 夢の投稿ページへのリンクカード */}
        <Link href="/bright-first-step/application" className="block">
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out p-6 sm:p-8 flex flex-col items-center text-center border-b-4 border-indigo-500">
            <svg className="w-12 h-12 text-indigo-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">新しい夢を投稿する</h2>
            <p className="text-gray-600 text-sm sm:text-base">
              学業に必要な物品の支援を募るための、あなたの「偉大な最初の一歩」をここで投稿します。
            </p>
          </div>
        </Link>

        {/* 自分の夢の投稿一覧ページへのリンクカード */}
        <Link href="/bright-first-step" className="block">
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out p-6 sm:p-8 flex flex-col items-center text-center border-b-4 border-purple-500">
            <svg className="w-12 h-12 text-purple-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">自分の投稿一覧</h2>
            <p className="text-gray-600 text-sm sm:text-base">
              あなたがこれまでに投稿した支援募集の一覧を確認・管理できます。
            </p>
          </div>
        </Link>

        {/* 活動報告の投稿ページへのリンクカード */}
        <Link href="/activity-report/post" className="block">
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out p-6 sm:p-8 flex flex-col items-center text-center border-b-4 border-emerald-500">
            <svg className="w-12 h-12 text-emerald-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">活動報告を行う</h2>
            <p className="text-gray-600 text-sm sm:text-base">
              支援者への日々の活動報告をここで投稿し、進捗を伝えましょう。
            </p>
          </div>
        </Link>

        {/* 活動報告の一覧ページへのリンクカード */}
        <Link href="/activity-report" className="block">
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out p-6 sm:p-8 flex flex-col items-center text-center border-b-4 border-sky-500">
            <svg className="w-12 h-12 text-sky-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v2"></path>
            </svg>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">活動報告一覧</h2>
            <p className="text-gray-600 text-sm sm:text-base">
              これまでに投稿した活動報告の履歴を確認できます。
            </p>
          </div>
        </Link>
      </div>

      
    </div>
  );
};

export default StudentHomePage;
