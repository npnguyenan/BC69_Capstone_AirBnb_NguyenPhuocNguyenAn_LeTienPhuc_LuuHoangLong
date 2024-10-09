import { useQuery } from "@tanstack/react-query";
import { objectToQueryString } from "../../utils";
import { quanLyPhimServices } from "../../services";

type UseFilmDetailByIdParams = {
  id: string;
};

export const useFilmDetailById = ({ id }: UseFilmDetailByIdParams) => {
  const query = useQuery({
    queryKey: ["FilmDetail", id],
    queryFn: () => {
      const queryString = objectToQueryString({
        maPhim: id
      })
      return quanLyPhimServices.getFilmDetailById(queryString);
    }
  })

  return {
    ...query,
    data: query?.data?.data.content
  };
};
