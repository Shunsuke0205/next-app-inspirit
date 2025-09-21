import Link from "next/link";
import React from "react";

const SignupGuidePage = () => {
  return (
    <div className="h-screen flex items-start justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-xl font-bold text-center text-gray-800">ご登録ありがとうございました。</h1>

        


        {/* ログインへの案内 */}
        <div className="mt-8">
          <p className="text-sm">
            数分以内に、「Supabase Auth」というところから、「高校生の代理購入アプリの新規登録」という件名のメールが届きます。
          </p>
          <p className="text-sm">
            そのメールに記載されているリンクをクリックしていただくとユーザー登録が完了し、ログインできるようになります。
          </p>
          <p className="text-sm mb-4">
            メールのURLをクリックしていただくとアプリ上のユーザー登録は完了しますが、それだけではまだアプリを使えません。
            <br />
            高校生でない人による不正利用を防ぐために、すべての高校生ユーザーは、アプリの運営者（平田駿輔）によって高校生かどうか認証されています。認証された高校生だけがアプリを使えるように手作業で確認を行っておりますので、こちらの Google フォームの送信にご協力いただけますと幸いです。🙇🏻‍♀️
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfg0nYl7PQXAwTNDfxdfNiHS2d7w4K45nplbOu8QOV6hCU4GQ/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline">
            高校生の認証用フォーム（1分で終わります）
          </a>
          <p className="text-sm mt-4">
            今後ともどうぞよろしくお願いいたします。
            <br />
            平田駿輔
          </p>
          <Link href="/login">
            <button className="mt-4 w-full py-2 px-4 border border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition duration-300 ease-in-out">
              ログインはこちら
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupGuidePage;
