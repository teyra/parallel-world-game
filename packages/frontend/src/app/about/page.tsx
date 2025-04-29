"use client";
import { useRouter } from "next/navigation";

const AboutPage = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/contact?id=2"); // 跳转到 contact 页面
  };

  return (
    <div>
      <h1>About Page</h1>
      <button
        onClick={handleNavigate}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go to Contact Page
      </button>
    </div>
  );
};

export default AboutPage;
