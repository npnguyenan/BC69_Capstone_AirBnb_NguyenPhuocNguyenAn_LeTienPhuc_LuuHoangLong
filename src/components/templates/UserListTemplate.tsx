import { Button } from "antd";
import { useDeleteUserMutation } from "../../hooks/api";

import { useQuery } from "@tanstack/react-query";
import { nguoiDungServices } from "../../services";
import { useAppDispatch } from "../../stores";
import { userActions } from "../../stores/quanLyNguoiDung";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { PATH } from "../../constants";

export const UserListTemplate = () => {
  // const { userId } = useQuanLyNguoiDungSelector();
  const dispatch = useAppDispatch();
  const deleteUserMutation = useDeleteUserMutation();
  const navigate = useNavigate();
  const location = useLocation();

  let { data: userListData } = useQuery({
    queryKey: ["DanhSachNguoiDung"],
    queryFn: async () => {
      return nguoiDungServices.getDanhSach();
    },
    staleTime: 5 * 60 * 1000,
    // true:  gọi API, false: ko gọi
    enabled: true,
    refetchInterval: 10000,
  });

  return (
    <div className="mx-auto container grid">
      <div className="mx-auto">
        <Outlet />
      </div>
      <h1 className="text-30 font-400 my-20">Danh sách người dùng</h1>
      {location.pathname == PATH.addUser ? (
        <></>
      ) : (
        <Button
          className="px-10 w-fit mb-10"
          onClick={() => {
            navigate(PATH.addUser);
          }}
        >
          +
        </Button>
      )}

      <table className="table-auto ">
        <thead className="bg-gray-600 text-white">
          <tr>
            <th className="">ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Birthday</th>
            <th className="px-5">Gender</th>
            {/* <th className="px-5">Phone</th> */}
            {/* <th className="px-5">Password</th> */}
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {userListData?.data.content.map((user, count = 1) => {
            count++;
            // getPhoneAndPasswordUser(user.name);
            return (
              <tr key={user.id} className={count % 2 ? "bg-gray-300" : ""}>
                <td className="py-10">{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.birthday}</td>
                <td>{user.gender ? "Male" : "Female"}</td>
                {/* <td>{getPhoneById(user.id)}</td> */}
                {/* <td>{user.phone}</td> */}
                <td className="text-center">{user.role}</td>
                <td>
                  <Button
                    className="me-3 bg-red-400"
                    onClick={() => {
                      deleteUserMutation.mutate(user);
                    }}
                  >
                    Xóa
                  </Button>
                  <Button
                    className="bg-yellow-400"
                    onClick={() => {
                      // handleEditUser(user.id);
                      // setUserId(user.id);
                      // refetchUserById();
                      dispatch(userActions.setUserId(user.id));
                      dispatch(userActions.setIsEditUser(true));
                      navigate(PATH.editUser);
                    }}
                  >
                    Sửa
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
