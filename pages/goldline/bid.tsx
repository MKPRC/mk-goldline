// bid.tsx - Airtable integration for MK Gold Line (사장님 입찰 등록)
import { useState } from "react";

export default function BidPage() {
  const [formData, setFormData] = useState({
    item: "",
    shop: "",
    price: "",
    method: "",
    fee: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const airtableToken = "pat3ZspiJGhrmEu7J.389e06ba4a9e945d424e8c97d5c57cb2cb5035e1c962ad11524634cd01588536";
    const baseId = "appsbABfJ6L9bVXot";
    const tableName = "입찰기록";

    const record = {
      fields: {
        "금 이름": formData.item,
        "상호명": formData.shop,
        "제시 금액": parseInt(formData.price),
        "결제 방식": formData.method,
        "수수료": formData.fee,
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
        setMessage("입찰이 접수되었습니다. MK가 고객에게 전달합니다.");
        setFormData({ item: "", shop: "", price: "", method: "", fee: "" });
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
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-12">
      <h1 className="text-3xl font-extrabold text-yellow-400 mb-6">사장님 입찰하기</h1>
      <p className="text-gray-400 mb-6 text-center">
        고객의 금 정보를 확인하고, 제시하실 가격과 조건을 입력해주세요.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-5"
      >
        <input
          type="text"
          name="item"
          placeholder="입찰 대상 금 (예: 18K 반지)"
          value={formData.item}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700"
          required
        />
        <input
          type="text"
          name="shop"
          placeholder="귀금속점 이름"
          value={formData.shop}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="제시 금액 (숫자만)"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700"
          required
        />
        <input
          type="text"
          name="method"
          placeholder="결제 방식 (예: 계좌이체 / 현금지급)"
          value={formData.method}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700"
        />
        <input
          type="text"
          name="fee"
          placeholder="수수료 (예: 1.5%)"
          value={formData.fee}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700"
        />
        <button
          type="submit"
          className="bg-yellow-400 text-black font-bold py-3 px-6 rounded-xl w-full hover:bg-yellow-300 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "입찰 중..." : "입찰 제출하기"}
        </button>
        {message && <p className="text-sm text-center mt-4 text-green-400">{message}</p>}
      </form>
    </div>
  );
}
