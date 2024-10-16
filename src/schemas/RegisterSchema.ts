import z from "zod";

// Hàm kiểm tra định dạng ngày (DD/MM/YYYY)
const isValidDate = (date: string) => {
  // Kiểm tra định dạng chuỗi ngày (DD/MM/YYYY) bằng regex
  const regex = /^([0-2][0-9]|(3)[0-1])\/(0[1-9]|1[0-2])\/(\d{4})$/;
  if (!regex.test(date)) {
    return false;
  }

  // Tách ngày, tháng, năm
  const [day, month, year] = date.split("/").map(Number);

  // Kiểm tra ngày hợp lệ theo tháng
  const isValidMonth = month >= 1 && month <= 12;
  const isValidDay =
    day >= 1 && day <= (isValidMonth ? new Date(year, month, 0).getDate() : 0);

  return isValidMonth && isValidDay;
};

// Validation và quy định kiểu dữ liệu trả về của Form tương ứng vs schema
export const RegisterSchema = z.object({
  id: z.any(),
  name: z.string().min(1, "Tên không được để trống"),
  email: z.string().email("Email không đúng định dạng"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  phone: z.string().min(10, "Số điện thoại phải có ít nhất 10 chữ số"),
  birthday: z.string().refine(isValidDate, {
    message: "Ngày sinh phải có định dạng DD/MM/YYYY và hợp lệ",
  }),
  gender: z.boolean().default(false), // true là Male, false là Female (default là Female)
  role: z.string().refine((val: string) => ["user", "admin"].includes(val), {
    message: "Vai trò phải là 'user' hoặc 'admin'",
  }),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
