import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { InputRoomSchema, InputRoomSchemaType } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select } from "antd";
import { useQuery } from "@tanstack/react-query";
import { phongServices } from "../../services";

export const FormRoomTemplate = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InputRoomSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(InputRoomSchema),
  });

  const { data } = useQuery({
    queryKey: ["DanhSachPhong1"],
    queryFn: () => {
      return phongServices.getRoom();
    },
  });

  const onSubmit: SubmitHandler<InputRoomSchemaType> = (values) => {
    console.log(values); // Xử lý dữ liệu ở đây
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ID */}
            <div>
              <p>
                ID
                <span className="text-red-600">*</span>
              </p>
              <Controller
                name="id"
                control={control}
                render={({ field }) => (
                  <Input status={errors.id && "error"} {...field} />
                )}
              />
              {errors.id && <p className="text-red-500">{errors.id.message}</p>}
            </div>

            {/* Tên Phòng */}
            <div>
              <p>
                Tên Phòng
                <span className="text-red-600">*</span>
              </p>
              <Controller
                name="tenPhong"
                control={control}
                render={({ field }) => (
                  <Input status={errors.tenPhong && "error"} {...field} />
                )}
              />
              {errors.tenPhong && (
                <p className="text-red-500">{errors.tenPhong.message}</p>
              )}
            </div>

            {/* Khách */}
            <div>
              <p>
                Khách
                <span className="text-red-600">*</span>
              </p>
              <Controller
                name="khach"
                control={control}
                render={({ field }) => (
                  <Input status={errors.khach && "error"} {...field} />
                )}
              />
              {errors.khach && (
                <p className="text-red-500">{errors.khach.message}</p>
              )}
            </div>

            {/* Phòng Ngủ */}
            <div>
              <p>
                Phòng Ngủ
                <span className="text-red-600">*</span>
              </p>
              <Controller
                name="phongNgu"
                control={control}
                render={({ field }) => (
                  <Input status={errors.phongNgu && "error"} {...field} />
                )}
              />
              {errors.phongNgu && (
                <p className="text-red-500">{errors.phongNgu.message}</p>
              )}
            </div>

            {/* Giường */}
            <div>
              <p>
                Giường
                <span className="text-red-600">*</span>
              </p>
              <Controller
                name="giuong"
                control={control}
                render={({ field }) => (
                  <Input status={errors.giuong && "error"} {...field} />
                )}
              />
              {errors.giuong && (
                <p className="text-red-500">{errors.giuong.message}</p>
              )}
            </div>

            {/* Phòng Tắm */}
            <div>
              <p>
                Phòng Tắm
                <span className="text-red-600">*</span>
              </p>
              <Controller
                name="phongTam"
                control={control}
                render={({ field }) => (
                  <Input status={errors.phongTam && "error"} {...field} />
                )}
              />
              {errors.phongTam && (
                <p className="text-red-500">{errors.phongTam.message}</p>
              )}
            </div>

            {/* Mô Tả */}
            <div>
              <p>
                Mô Tả
                <span className="text-red-600">*</span>
              </p>
              <Controller
                name="moTa"
                control={control}
                render={({ field }) => (
                  <Input status={errors.moTa && "error"} {...field} />
                )}
              />
              {errors.moTa && (
                <p className="text-red-500">{errors.moTa.message}</p>
              )}
            </div>

            {/* Giá Tiền */}
            <div>
              <p>
                Giá Tiền
                <span className="text-red-600">*</span>
              </p>
              <Controller
                name="giaTien"
                control={control}
                render={({ field }) => (
                  <Input status={errors.giaTien && "error"} {...field} />
                )}
              />
              {errors.giaTien && (
                <p className="text-red-500">{errors.giaTien.message}</p>
              )}
            </div>

            {/* Mã Vị Trí */}
            <div>
              <p>
                Mã Vị Trí
                <span className="text-red-600">*</span>
              </p>
              <Controller
                name="maViTri"
                control={control}
                render={({ field }) => (
                  <Input status={errors.maViTri && "error"} {...field} />
                )}
              />
              {errors.maViTri && (
                <p className="text-red-500">{errors.maViTri.message}</p>
              )}
            </div>

            {/* Hình Ảnh */}
            <div>
              <p>
                Hình Ảnh
                <span className="text-red-600">*</span>
              </p>
              <Controller
                name="hinhAnh"
                control={control}
                render={({ field }) => (
                  <Input status={errors.hinhAnh && "error"} {...field} />
                )}
              />
              {errors.hinhAnh && (
                <p className="text-red-500">{errors.hinhAnh.message}</p>
              )}
            </div>
          </div>

          <div className="mt-3">
            {/* Nhóm 1 */}
            <div className="flex mb-3 justify-between">
              <div className="flex-1 flex items-center mr-3">
                <p className="w-24">
                  Máy Giặt
                  <span className="text-red-600">*</span>
                </p>
                <Controller
                  name="mayGiat"
                  control={control}
                  render={({ field }) => (
                    <Select
                      status={errors.mayGiat && "error"}
                      {...field}
                      className="w-24"
                    >
                      <Select.Option value={true}>Có</Select.Option>
                      <Select.Option value={false}>Không</Select.Option>
                    </Select>
                  )}
                />
                {errors.mayGiat && (
                  <p className="text-red-500">{errors.mayGiat.message}</p>
                )}
              </div>

              <div className="flex-1 flex items-center mr-3">
                <p className="w-24">
                  Bàn Là
                  <span className="text-red-600">*</span>
                </p>
                <Controller
                  name="banLa"
                  control={control}
                  render={({ field }) => (
                    <Select
                      status={errors.banLa && "error"}
                      {...field}
                      className="w-24"
                    >
                      <Select.Option value={true}>Có</Select.Option>
                      <Select.Option value={false}>Không</Select.Option>
                    </Select>
                  )}
                />
                {errors.banLa && (
                  <p className="text-red-500">{errors.banLa.message}</p>
                )}
              </div>

              <div className="flex-1 flex items-center mr-3">
                <p className="w-24">
                  Tivi
                  <span className="text-red-600">*</span>
                </p>
                <Controller
                  name="tivi"
                  control={control}
                  render={({ field }) => (
                    <Select
                      status={errors.tivi && "error"}
                      {...field}
                      className="w-24"
                    >
                      <Select.Option value={true}>Có</Select.Option>
                      <Select.Option value={false}>Không</Select.Option>
                    </Select>
                  )}
                />
                {errors.tivi && (
                  <p className="text-red-500">{errors.tivi.message}</p>
                )}
              </div>
            </div>

            {/* Nhóm 2 */}
            <div className="flex mb-3 justify-between">
              <div className="flex-1 flex items-center mr-3">
                <p className="w-24">
                  Điều Hòa
                  <span className="text-red-600">*</span>
                </p>
                <Controller
                  name="dieuHoa"
                  control={control}
                  render={({ field }) => (
                    <Select
                      status={errors.dieuHoa && "error"}
                      {...field}
                      className="w-24"
                    >
                      <Select.Option value={true}>Có</Select.Option>
                      <Select.Option value={false}>Không</Select.Option>
                    </Select>
                  )}
                />
                {errors.dieuHoa && (
                  <p className="text-red-500">{errors.dieuHoa.message}</p>
                )}
              </div>

              <div className="flex-1 flex items-center mr-3">
                <p className="w-24">
                  Wifi
                  <span className="text-red-600">*</span>
                </p>
                <Controller
                  name="wifi"
                  control={control}
                  render={({ field }) => (
                    <Select
                      status={errors.wifi && "error"}
                      {...field}
                      className="w-24"
                    >
                      <Select.Option value={true}>Có</Select.Option>
                      <Select.Option value={false}>Không</Select.Option>
                    </Select>
                  )}
                />
                {errors.wifi && (
                  <p className="text-red-500">{errors.wifi.message}</p>
                )}
              </div>

              <div className="flex-1 flex items-center mr-3">
                <p className="w-24">
                  Bếp
                  <span className="text-red-600">*</span>
                </p>
                <Controller
                  name="bep"
                  control={control}
                  render={({ field }) => (
                    <Select
                      status={errors.bep && "error"}
                      {...field}
                      className="w-24"
                    >
                      <Select.Option value={true}>Có</Select.Option>
                      <Select.Option value={false}>Không</Select.Option>
                    </Select>
                  )}
                />
                {errors.bep && (
                  <p className="text-red-500">{errors.bep.message}</p>
                )}
              </div>
            </div>

            {/* Nhóm 3 */}
            <div className="flex mb-3 justify-between">
              <div className="flex-1 flex items-center mr-3">
                <p className="w-24">
                  Đỗ Xe
                  <span className="text-red-600">*</span>
                </p>
                <Controller
                  name="doXe"
                  control={control}
                  render={({ field }) => (
                    <Select
                      status={errors.doXe && "error"}
                      {...field}
                      className="w-24"
                    >
                      <Select.Option value={true}>Có</Select.Option>
                      <Select.Option value={false}>Không</Select.Option>
                    </Select>
                  )}
                />
                {errors.doXe && (
                  <p className="text-red-500">{errors.doXe.message}</p>
                )}
              </div>

              <div className="flex-1 flex items-center mr-3">
                <p className="w-24">
                  Hồ Bơi
                  <span className="text-red-600">*</span>
                </p>
                <Controller
                  name="hoBoi"
                  control={control}
                  render={({ field }) => (
                    <Select
                      status={errors.hoBoi && "error"}
                      {...field}
                      className="w-24"
                    >
                      <Select.Option value={true}>Có</Select.Option>
                      <Select.Option value={false}>Không</Select.Option>
                    </Select>
                  )}
                />
                {errors.hoBoi && (
                  <p className="text-red-500">{errors.hoBoi.message}</p>
                )}
              </div>

              <div className="flex-1 flex items-center mr-3">
                <p className="w-24">
                  Bàn Ủi
                  <span className="text-red-600">*</span>
                </p>
                <Controller
                  name="banUi"
                  control={control}
                  render={({ field }) => (
                    <Select
                      status={errors.banUi && "error"}
                      {...field}
                      className="w-24"
                    >
                      <Select.Option value={true}>Có</Select.Option>
                      <Select.Option value={false}>Không</Select.Option>
                    </Select>
                  )}
                />
                {errors.banUi && (
                  <p className="text-red-500">{errors.banUi.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-end">
            <Button type="primary" htmlType="submit" className="mr-3">
              Thêm Phòng
            </Button>
            <Button type="primary">Cập Nhật</Button>
          </div>
        </div>
      </form>
    </div>
  );
};
