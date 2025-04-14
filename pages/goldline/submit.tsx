// submit.tsx - Airtable integration for MK Gold Line
// Code recreated due to previous link expiration.
// Full functional React component for Airtable submission.

import { useState } from "react";

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    name: "",
    weight: "",
    category: "",
    description: "",
    image: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const airtableToken = "pat3ZspiJGhrmEu7J.389e06ba4a9e945d424e8c97d5c57cb2cb5035e1c962ad11524634cd01588536";
    const baseId = "appsbABfJ6L9bVXot";
    const tableName = "접수목록";

    const record = {
      fields: {
        "금 이름": formData.name,
        "무게(g)": parseFloat(formData.weight),
        "카테고리": formData.category,
        "설명": formData.description || "-",
      },
    };

    try {
      const response = await fetch(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${airtableToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });

      if (response.ok) {
        setMessage("접수가 완료되었습니다. MK가 흐름을 이어드립니다.");
        setFormData({ name: "", weight: "", category: "", description: "", image: null });
      } else {
        const errorData = await response.json();
        setMessage(`에러 발생: ${errorData.error.message}`);
      }
    } catch (error) {
      console.error("에러 발생:", error);
      setMessage("네트워크 오류 또는 알 수 없는 문제가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-4xl font-extrabold text-gold-400 mb-4">MK GOLD LINE</h1>
      <p className="text-base text-gray-400 mb-8 text-center">
        당신의 금, 가장 잘 알아주는 사장님에게. <br />지금 MK를 통해 신뢰의 흐름을 시작해보세요.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-5"
      >
        <input
          type="text"
          name="name"
          placeholder="금 이름 (예: 18K 팔찌)"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700"
          required
        />
        <input
          type="number"
          name="weight"
          placeholder="무게 (g)"
          value={formData.weight}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700"
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-zinc-800 text-white border border-zinc-700"
          required
        >
          <option value="">카테고리 선택</option>
          <option value="목걸이">목걸이</option>
          <option value="반지">반지</option>
          <option value="팔찌">팔찌</option>
          <option value="기타">기타</option>
        </select>
        <textarea
          name="description"
          placeholder="설명 (선택사항)"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700"
          rows={3}
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-zinc-800 text-white border border-zinc-700"
        />
        <button
          type="submit"
          className="bg-yellow-400 text-black font-bold py-3 px-6 rounded-xl w-full hover:bg-yellow-300 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "접수 중..." : "접수하기"}
        </button>
        {message && <p className="text-sm text-center mt-4 text-green-400">{message}</p>}
      </form>
    </div>
  );
}
