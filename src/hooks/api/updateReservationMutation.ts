// rafc

import { useMutation } from "@tanstack/react-query";
import { datphongServices } from "../../services";
import { toast } from "react-toastify";
import { Reservation } from "../../@types";
import { useAppDispatch } from "../../stores";
import { quanLyDatPhongActions } from "../../stores/quanLyDatPhong";

// JS docs để note document

export const useUpdateReservationMutation = () => {
  const dispatch = useAppDispatch();
  const updateDatPhongMutation = useMutation({
    mutationFn: (payload: Reservation) => {
      return datphongServices.updateReservation(`${payload.id}`, payload);
    },
    onSuccess: async () => {
      toast.success("Cập nhật đặt phòng thành công");
      dispatch(quanLyDatPhongActions.setIsEditReservation(false));
      window.location.reload();
    },
    onError: (error: any) => {
      toast.error(error.response.data.content);
    },
  });
  return updateDatPhongMutation;
};
