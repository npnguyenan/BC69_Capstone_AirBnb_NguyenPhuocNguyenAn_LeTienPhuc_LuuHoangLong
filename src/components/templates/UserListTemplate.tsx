import { Button } from "antd";
import { useDeleteUserMutation } from "../../hooks/api";

import { useQuery } from "@tanstack/react-query";
import { nguoiDungServices } from "../../services";
import { useAppDispatch } from "../../stores";
import {
  useQuanLyNguoiDungSelector,
  userActions,
} from "../../stores/quanLyNguoiDung";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { PATH } from "../../constants";
import { useEffect } from "react";

export const UserListTemplate = () => {
  // const { userId } = useQuanLyNguoiDungSelector();
  const dispatch = useAppDispatch();
  const deleteUserMutation = useDeleteUserMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const { reloadAPI } = useQuanLyNguoiDungSelector();
  let { data: userListData, refetch: refetchUserList } = useQuery({
    queryKey: ["DanhSachNguoiDung"],
    queryFn: async () => {
      return nguoiDungServices.getDanhSach();
    },
    staleTime: 5 * 60 * 1000,
    // true:  gọi API, false: ko gọi
    enabled: true,
  });
  useEffect(() => {
    if (reloadAPI == true) {
      refetchUserList();
    }
  }, [reloadAPI, refetchUserList]);
  return (
    <div className="mx-auto container grid xl:w-11/12 lg:w-10/12">
      <div className="mx-auto">
        <Outlet />
      </div>
      <h1 className="text-[30px] my-[20px] ">Danh sách người dùng</h1>
      {location.pathname == PATH.addUser ? (
        <></>
      ) : (
        <Button
          className="px-[10px] w-fit mb-10"
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
                <td className="py-10 lg:py-0 ">{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.birthday}</td>
                <td>{user.gender ? "Male" : "Female"}</td>
                {/* <td>{getPhoneById(user.id)}</td> */}
                {/* <td>{user.phone}</td> */}
                <td className="text-center">{user.role}</td>
                <td>
                  <Button
                    className="me-3 bg-red-400 2xl:me-0"
                    onClick={() => {
                      deleteUserMutation.mutate(user);
                    }}
                  >
                    <i className="fa-solid fa-trash text-white"></i>
                  </Button>
                  <Button
                    className="bg-yellow-400"
                    onClick={() => {
                      dispatch(userActions.setUserId(user.id));
                      dispatch(userActions.setIsEditUser(true));
                      navigate(PATH.editUser);
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square text-white"></i>
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
