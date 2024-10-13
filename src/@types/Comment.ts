export type Comment = {
  id: number;
  maPhong: number;
  maNguoiBinhLuan: number;
  ngayBinhLuan: string;
  noiDung: string;
  saoBinhLuan: number;
  avatar: string;
};

export type CommentByRoom = {
  id: number;
  tenNguoiBinhLuan: string;
  ngayBinhLuan: string;
  noiDung: string;
  saoBinhLuan: number;
  avatar: string;
};
//   "id": 0,
//   "maPhong": 0,
//   "maNguoiBinhLuan": 0,
//   "ngayBinhLuan": "string",
//   "noiDung": "string",
//   "saoBinhLuan": 0
