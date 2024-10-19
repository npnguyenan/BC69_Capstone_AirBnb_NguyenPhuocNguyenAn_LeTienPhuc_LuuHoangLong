// rafc

import { useMutation } from "@tanstack/react-query";
import { datphongServices } from "../../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Reservation } from "../../@types";
import { PATH } from "../../constants";

// JS docs để note document

export const useUpdateReservationMutation = () => {
  const navigate = useNavigate();
  const datPhongMutation = useMutation({
    mutationKey: ["Update"],
    mutationFn: async (payload: Reservation) => {
      return datphongServices.updateReservation(`${payload.id}`, payload);
    },
    onSuccess: async () => {
      toast.success("Cập nhật đặt phòng thành công");

      navigate(PATH.DetailRoom);
    },
    onError: (error: any) => {
      toast.error(error.response.data.content);
    },
  });
  return datPhongMutation;
};
