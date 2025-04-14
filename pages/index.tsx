import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>골드라인 | 신뢰 있는 금 거래</title>
        <meta name="description" content="간편하고 안전한 금 입찰 플랫폼, 골드라인" />
      </Head>

      <main className="min-h-screen bg-white text-black font-sans">
        {/* Hero Section */}
        <section className="text-center py-20 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">신뢰 있는 금 거래, 지금 시작하세요</h1>
          <p className="text-lg md:text-xl mb-6">간편하게 금을 올리고, 안전하게 입찰받으세요.</p>
          <a href="https://your-airtable-form-link.com" target="_blank" rel="noopener noreferrer">
            <button className="bg-black text-white rounded-2xl px-6 py-3 text-lg shadow-md">
              금 올리기
            </button>
          </a>
        </section>

        {/* 소개 섹션 */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-20 py-12 text-center">
          <div>
            <h2 className="text-xl font-semibold mb-2">쉽게 올리기</h2>
            <p>모바일로 1분 만에 금을 등록하세요.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">입찰받기</h2>
            <p>전문 입찰자들이 경쟁 입찰을 진행합니다.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">안심하고 거래하기</h2>
            <p>정식 등록된 업체와의 안전한 거래를 보장합니다.</p>
          </div>
        </section>

        {/* FAQ 섹션 */}
        <section className="px-6 md:px-20 py-12">
          <h3 className="text-2xl font-bold mb-6 text-center">자주 묻는 질문</h3>
          <ul className="space-y-4">
            <li>
              <strong>입찰은 무료인가요?</strong>
              <p>네, 금 등록과 입찰 참여는 모두 무료입니다.</p>
            </li>
            <li>
              <strong>언제 입찰이 시작되나요?</strong>
              <p>금 등록 후, 바로 입찰이 시작됩니다.</p>
            </li>
            <li>
              <strong>정산은 어떻게 진행되나요?</strong>
              <p>입찰 종료 후, 사장님과 거래가 확정되면 정산이 이루어집니다.</p>
            </li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="bg-gray-100 text-center text-sm py-6">
          <p>
            고객센터 |{" "}
            <a href=\"/partner\" className=\"underline\">사업자 전용</a> | © 2025 GoldLine
          </p>
        </footer>
      </main>
    </>
  );
}
