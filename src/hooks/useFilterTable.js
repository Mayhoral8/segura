"use client"
import { useSearchParams, useRouter } from "next/navigation";

export const useFilterTable = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterTable = (key, value) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    if (value && searchParams.get(key) !== value) {
      currentParams.set(key, value);
    } else if (!value || searchParams.get(key) === value) {
      currentParams.delete(key);
    }
    router.push(`?${currentParams.toString()}`);
  };

  return { filterTable };
};
