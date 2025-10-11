"use client";

import React from "react";
import { CommitmentType, recordCommitment } from "./actions";

type Application = {
  id: string;
  title: string;
  commitmentType: CommitmentType | null;
};



const CommitmentButton = ({ application } : { application: Application }) => {
  // const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleCommitment = async (applicationId: string, type: CommitmentType) => {
    const { error } = await recordCommitment(applicationId, type);
    if (error) {
      console.error("Error recording commitment:", error);
      // setStatusMessage("コミットメントの記録に失敗しました。もう一度お試しください。");
      return;
    }
    // setStatusMessage(`Committed as ${type} for application ${applicationId}`);
  }

  // 現在の報告タイプを取得
  const currentType = application.commitmentType;
  const isPotentialMiss = currentType === "potential_miss";
  const isCompleted = currentType === "completed"; // 念のため

  return (
    <div key={application.id} className="border-b pb-4 last:border-b-0 last:pb-0">
      <h3 className="font-semibold text-gray-800 text-base mb-3">{application.title}</h3>

      {/* ⚠️ 仮報告状態の表示 */}
      <p className="text-xs font-medium text-red-500 mb-2">
        {isPotentialMiss 
          ? "⚠️ 「触れないかも」と仮報告済みなので、「触れた」に上書き可能です。" 
          : "今日はまだ報告していません。"}
      </p>

      <div className="flex gap-2">
        {/* 1. 今日触れたボタン (常に可能) */}
        <button
          onClick={() => handleCommitment(application.id, "touched")}
          className={"flex-1 py-3 text-white rounded-lg hover:bg-indigo-600 text-sm font-medium transition shadow-md bg-indigo-500"}
          disabled={isCompleted}
        >
          今日触れた 🙌🏻
        </button>

        {/* 2. 今日は触れないかもボタン (一度押したら色を変えて無効化) */}
        <button
          onClick={() => handleCommitment(application.id, "potential_miss")}            className={`flex-1 py-3 rounded-lg text-sm font-medium transition shadow-md 
                          ${isPotentialMiss ? "bg-yellow-200 text-gray-400 cursor-not-allowed" : "bg-yellow-600 text-white hover:bg-yellow-700"}`}
           disabled={isCompleted || isPotentialMiss} // 完了後、または既に押した後は無効
        >
          今日は触れないかも 🤔
        </button>
          
        {/* 3. もう完了ボタン (仮報告中、または完了後は押せない) */}
        <button
          onClick={() => handleCommitment(application.id, "completed")}
          className={`py-3 px-3 text-white rounded-lg text-sm font-medium transition shadow-md 
                          ${isPotentialMiss || isCompleted ? "bg-gray-300 cursor-not-allowed" : "bg-gray-500 hover:bg-gray-600"}`}
          disabled={isPotentialMiss || isCompleted} // ★ 修正: 仮報告中、または完了後は無効化
        >
          完了！✅
        </button>
      </div>
    </div>
  );
};

export default CommitmentButton;
