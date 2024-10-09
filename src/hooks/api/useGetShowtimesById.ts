import { useQuery } from "@tanstack/react-query";
import { quanLyRap } from "../../services";
import { objectToQueryString } from "../../utils";

type UseGetShowtimesByIdParams = {
  id: string;
};

export const useGetShowtimesById = ({ id }: UseGetShowtimesByIdParams) => {
  const query = useQuery({
    queryKey: ["Showtimes", id],
    queryFn: () => {
      return quanLyRap.getShowtimesById(objectToQueryString({ maPhim: id }));
    },
  });

  return {
    ...query,
    data: query?.data?.data?.content,
  };
};
