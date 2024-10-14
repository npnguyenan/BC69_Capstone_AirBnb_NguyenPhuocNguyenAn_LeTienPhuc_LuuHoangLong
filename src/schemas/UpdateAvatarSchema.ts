import z from "zod";

export const UpdateAvatarSchema = z.object({
  avatar: z.any().refine((file) => file instanceof File, {
    message: "Vui lòng chọn ảnh đại diện",
  }),
});

export type UpdateAvatarSchemaType = z.infer<typeof UpdateAvatarSchema>;
