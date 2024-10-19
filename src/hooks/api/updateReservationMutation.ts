// rafc

import { useMutation } from "@tanstack/react-query";
import { datphongServices } from "../../services";
import { toast } from "react-toastify";
import { Reservation } from "../../@types";

// JS docs để note document

export const useUpdateReservationMutation = () => {
  const datPhongMutation = useMutation({
    mutationKey: ["Update"],
    mutationFn: async (payload: Reservation) => {
      return datphongServices.updateReservation(`${payload.id}`, payload);
    },
    onSuccess: async () => {
      toast.success("Cập nhật đặt phòng thành công");

      window.location.reload();
    },
    onError: (error: any) => {
      toast.error(error.response.data.content);
    },
  });
  return datPhongMutation;
};
