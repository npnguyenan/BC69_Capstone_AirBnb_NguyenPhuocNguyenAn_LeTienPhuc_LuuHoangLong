import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Email không đúng định dạng"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
