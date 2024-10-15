export type Comment = {
  id: number;
  maPhong: number;
  maNguoiBinhLuan: number;
  ngayBinhLuan?: string;
  noiDung: string;
  saoBinhLuan: number;
};

export type CommentByRoom = {
  id: number;
  tenNguoiBinhLuan: string;
  ngayBinhLuan: string;
  noiDung: string;
  saoBinhLuan: number;
  avatar: string;
};
