// rafc

import { useMutation } from "@tanstack/react-query";
import { datphongServices } from "../../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Reservation } from "../../@types";

// JS docs để note document

export const useAddReservationMutation = () => {
  const datPhongMutation = useMutation({
    mutationKey: ["Add"],
    mutationFn: async (payload: Reservation) => {
      return datphongServices.addReservation(payload);
    },
    onSuccess: async () => {
      console.log("log");
      toast.success("Đặt phòng thành công");

      window.location.reload();
    },
    onError: (error: any) => {
      toast.error(error.response.data.content);
    },
  });
  return datPhongMutation;
};
