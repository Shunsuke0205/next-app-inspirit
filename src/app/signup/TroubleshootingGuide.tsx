"use client"

import React, { useState } from "react";

export default function TroubleshootingGuide() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <button
        onClick={toggleExpand}
        className=""
      >
        {isExpanded ? '▲ 注意書きを閉じる' : '▼ 新規登録ができなかった方へ'}
      </button>
      {/* 新規登録ができなかった方への注意書き */}
      {isExpanded && (
        <div className="border border-red-300 bg-red-50 p-4 rounded-lg text-sm text-gray-700">
          <p className="font-bold text-red-600 mb-2">新規登録ができなかった方へ</p>
          <p>
            このウェブアプリをつくっている、ひらたと申します。ご不便をおかけして申し訳ございません。
          </p>
          <p className="mt-2">
            システムからのメールが届かない場合、携帯キャリアのメールアドレス（docomo, au, softbankなど）によるフィルタリングが原因かもしれません。
            `noreply@mail.app.supabase.io` からのメールを受信するよう設定いただくか、GoogleアカウントのGmailアドレスなどをお試しくださいますでしょうか。
          </p>
          <p className="mt-2 font-bold">他に考えられる原因</p>
          <ul className="list-disc list-inside mt-1 ml-4 space-y-1">
            <li>パスワードが8文字より短い</li>
              <li>入力したメールアドレスに誤りがある</li>
            </ul>
          <p className="mt-2">
            いろいろ試してもダメな場合は、お手数ですが、<a href="mailto:hirata@example.com" className="text-indigo-600 underline hover:text-indigo-800">こちらにメール</a>をくださいますか？
            <span role="img" aria-label="sorry"> 🙇‍♂️</span>
          </p>
        </div>
          
      )}
   </div>
  )
};