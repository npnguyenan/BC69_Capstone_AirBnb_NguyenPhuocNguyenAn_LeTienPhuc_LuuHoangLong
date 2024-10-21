// rafc

import { useMutation } from "@tanstack/react-query";
import { datphongServices } from "../../services";
import { toast } from "react-toastify";
import { Reservation } from "../../@types";
import { quanLyDatPhongActions } from "../../stores/quanLyDatPhong";
import { useAppDispatch } from "../../stores";
import { sleep } from "../../utils";

// JS docs để note document

export const useAddReservationMutation = () => {
  const dispatch = useAppDispatch();
  const addDatPhongMutation = useMutation({
    mutationKey: ["Add"],
    mutationFn: async (payload: Reservation) => {
      return datphongServices.addReservation(payload);
    },
    onSuccess: async () => {
      console.log("log");
      toast.success("Đặt phòng thành công");

      dispatch(quanLyDatPhongActions.setReservationList(true));
      await sleep(2000);
      dispatch(quanLyDatPhongActions.setReservationList(false));
      // window.location.reload();
    },
    onError: (error: any) => {
      toast.error(error.response.data.content);
    },
  });
  return addDatPhongMutation;
};
