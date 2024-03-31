"use client";

import { useCallback, useMemo, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import Category from "./category";

export default function Categories() {
  const observer = useRef<IntersectionObserver>();

  const {
    data,
    error,
    isLoading,
    isFetching,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: "categories",
    queryFn: ({ pageParam = 1 }) => {},
    getNextPageParam(lastPage, allPages) {
      return lastPage.length ? allPages.length + 1 : undefined
    },
  });

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading]
  );

  const categories = useMemo(() => {
    console.log(data);
    return (
      (data?.pages.reduce(
        (prev: any, page: any) => [...prev, ...page],
        []
      ) as any[]) ?? []
    );
  }, [data]);

  if (isLoading) return <span className="loading loading-spinner loading-lg" />;

  if (isError) return <h1>Error</h1>;

  return (
    <div>
      {categories?.map((category: any, i: number) =>
        categories.length === i + 1 ? (
          <Category key={category.id} ref={lastElementRef} />
        ) : (
          <Category key={category.id} />
        )
      )}
      {isFetching && <span className="loading loading-spinner loading-lg" />}
    </div>
  );
}
