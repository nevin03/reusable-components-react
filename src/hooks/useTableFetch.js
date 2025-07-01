import { useQuery } from "@tanstack/react-query";

const useTableFetch = ({
  key,
  url,
  pageIndex,
  pageSize,
  filterKey,
  filterValue,
  enabled = true,
  staleTime = 0,
  cacheTime = 5 * 60 * 1000,
  keepPreviousData = true,
  refetchOnWindowFocus = false,
}) => {
  const params = new URLSearchParams({
    _page: pageIndex + 1,
    _limit: pageSize,
  });

  if (filterKey && filterValue) {
    params.set(`${filterKey}_like`, filterValue);
  }

  const fetchData = async () => {
    const response = await fetch(`${url}?${params}`);
    const totalCount = response.headers.get("x-total-count");
    const data = await response.json();
    return {
      data,
      totalCount: Number(totalCount || data.length),
    };
  };

  const query = useQuery({
    queryKey: [key, pageIndex, pageSize, filterValue],
    queryFn: fetchData,
    keepPreviousData,
    staleTime,
    cacheTime,
    enabled,
    refetchOnWindowFocus,
  });

  return {
    ...query,
    isFetching: query.isFetching,
  };
};

export default useTableFetch;
