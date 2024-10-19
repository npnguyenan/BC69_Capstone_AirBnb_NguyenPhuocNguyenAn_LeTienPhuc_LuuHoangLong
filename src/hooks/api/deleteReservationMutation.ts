// rafc

import { useMutation } from "@tanstack/react-query";
import { datphongServices } from "../../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Reservation } from "../../@types";
import { PATH } from "../../constants";

// JS docs để note document

export const useDeleteReservationMutation = () => {
  const navigate = useNavigate();
  const datPhongMutation = useMutation({
    mutationKey: ["Delete"],
    mutationFn: async (payload: Reservation) => {
      return datphongServices.deleteReservation(`${payload.id}`);
    },
    onSuccess: async () => {
      toast.success("Xóa đặt phòng thành công");

      // navigate(PATH.DetailRoom);
    },
    onError: (error: any) => {
      toast.error(error.response.data.content);
    },
  });
  return datPhongMutation;
};
