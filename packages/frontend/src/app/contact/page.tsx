"use client";
import { useSearchParams } from "next/navigation";
const page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  return <div>page{id}</div>;
};

export default page;
