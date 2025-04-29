"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient, gql, cacheExchange, fetchExchange } from "urql";
import { Button } from "@/components/ui/button";

const apiKey = process.env.NEXT_PUBLIC_GRAPH_API_KEY;
console.log("🚀 ~ apiKey:", apiKey);

// 创建 GraphQL 客户端
const client = createClient({
  url: "https://gateway.thegraph.com/api/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV",
  fetchOptions: {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  },
  exchanges: [cacheExchange, fetchExchange],
});

// 定义 GraphQL 查询
const DATA_QUERY = gql`
  {
    pools(first: 10, orderBy: volumeUSD, orderDirection: desc) {
      id
      token0 {
        symbol
      }
      token1 {
        symbol
      }
      volumeUSD
      totalValueLockedUSD
    }
  }
`;

const RecordMainPage = () => {
  const router = useRouter(); // 使用 useRouter 获取路由对象
  const [pools, setPools] = useState<any[]>([]); // 存储交易对数据

  // 查询交易对数据
  const fetchPools = async () => {
    try {
      const response = await client.query(DATA_QUERY, {}).toPromise();
      const data = response.data;
      if (data && data.pools) {
        setPools(data.pools); // 设置交易对数据
      } else {
        console.error("No data found");
      }
    } catch (error) {
      console.error("Error fetching pools:", error);
    }
  };

  useEffect(() => {
    fetchPools(); // 页面加载时查询数据
  }, []);

  const handleDetail = (id: string) => {
    router.push(`/record/${id}`); // 跳转到动态路由页面
  };

  return (
    <div>
      <div className="text-4xl p-4">Uniswap V3 Pools</div>
      <div className="flex flex-col gap-4">
        {pools.map((pool) => (
          <div
            key={pool.id}
            className="flex justify-between items-center p-4 border-b border-gray-300"
          >
            <span>
              {pool.token0.symbol} / {pool.token1.symbol} | Volume: $
              {parseFloat(pool.volumeUSD).toFixed(2)} | TVL: $
              {parseFloat(pool.totalValueLockedUSD).toFixed(2)}
            </span>
            <Button
              onClick={() => handleDetail(pool.id)} // 点击按钮时调用 handleDetail 函数
            >
              Detail
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecordMainPage;
