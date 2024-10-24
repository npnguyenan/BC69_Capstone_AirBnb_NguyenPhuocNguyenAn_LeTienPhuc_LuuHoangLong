import moment from "moment";
import { z } from "zod";

export const ReservationSchema = z.object({
  // id: z.number(),
  id: z.any().default(0),
  maPhong: z.any(),
  ngayDen: z
    .string()
    .refine((value) => moment(value, "DD/MM/YYYY", true).isValid()),
  ngayDi: z
    .string()
    .refine((value) => moment(value, "DD/MM/YYYY", true).isValid()),
  soLuongKhach: z.coerce.number().int().nonnegative(),
  maNguoiDung: z.any(),
});

export type ReservationSchemaType = z.infer<typeof ReservationSchema>;
