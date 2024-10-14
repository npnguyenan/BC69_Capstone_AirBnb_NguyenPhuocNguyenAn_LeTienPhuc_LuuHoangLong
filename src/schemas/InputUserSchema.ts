import z from "zod";

export const InputUserSchema = z.object({
  id: z.number().default(0),
  name: z.string({ message: "Vui lòng nhập họ tên" }),
  email: z
    .string({ message: "Vui lòng nhập email" })
    .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email không đúng"),
  password: z.string({ message: "Vui lòng nhập mật khẩu" }).optional(),
  phone: z
    .string({ message: "Vui lòng nhập số điện thoại" })
    .regex(
      /^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/,
      "Số điện thoại không đúng"
    ),
  birthday: z
    .string({ message: "Vui lòng nhập ngày sinh" })
    .regex(
      /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
      "Nhập đúng định dạng"
    ),
  gender: z.boolean({ message: "Vui lòng chọn giới tính" }),
  role: z.string({ message: "Vui lòng chọn role" }),
  avatar: z.string().optional(),
});

export type InputUserSchemaType = z.infer<typeof InputUserSchema>;
