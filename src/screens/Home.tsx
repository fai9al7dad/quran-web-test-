import React, { useEffect, useState } from "react";
import SurahItem from "../components/SurahItem";
import useFetch from "../hooks/useFetch";

export default function Home() {
  const { data } = useFetch("chapters");

  return (
    <div>
      {/* عدد السور {data?.chapters?.length} */}
      {data?.chapters?.map((item, index) => {
        return <SurahItem key={index} surah={item} />;
      })}
    </div>
  );
}
