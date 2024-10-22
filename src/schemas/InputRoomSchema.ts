import z from "zod";

export const InputRoomSchema = z.object({
  id: z.number(),

  tenPhong: z.string(),

  khach: z.number(),

  phongNgu: z.number(),

  giuong: z.number(),

  phongTam: z.number(),

  moTa: z.string(),

  giaTien: z.number(),

  mayGiat: z.boolean(),

  banLa: z.boolean(),

  tivi: z.boolean(),

  dieuHoa: z.boolean(),

  wifi: z.boolean(),

  bep: z.boolean(),

  doXe: z.boolean(),

  hoBoi: z.boolean(),

  banUi: z.boolean(),

  maViTri: z.number(),

  hinhAnh: z.string(),
});

export type InputRoomSchemaType = z.infer<typeof InputRoomSchema>;
