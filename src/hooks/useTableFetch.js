import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";

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
  const params = {
    _page: pageIndex + 1,
    _limit: pageSize,
  };

  if (filterKey && filterValue) {
    params[`${filterKey}_like`] = filterValue;
  }

  const fetchData = async () => {
    const response = await axiosInstance.get(url, { params });
    return {
      data: response.data,
      totalCount: Number(
        response.headers["x-total-count"] || response.data.length
      ),
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
