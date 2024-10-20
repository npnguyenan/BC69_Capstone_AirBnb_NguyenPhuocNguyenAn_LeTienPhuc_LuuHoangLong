// rafc

import { useMutation } from "@tanstack/react-query";
import { datphongServices } from "../../services";
import { toast } from "react-toastify";
import { Reservation } from "../../@types";

// JS docs để note document

export const useDeleteReservationMutation = () => {
  const datPhongMutation = useMutation({
    mutationKey: ["Delete"],
    mutationFn: async (payload: Reservation) => {
      return datphongServices.deleteReservation(`${payload.id}`);
    },
    onSuccess: async () => {
      toast.success("Xóa đặt phòng thành công");
    },
    onError: (error: any) => {
      toast.error(error.response.data.content);
    },
  });
  return datPhongMutation;
};
