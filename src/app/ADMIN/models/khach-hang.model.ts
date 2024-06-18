export interface KhachHang{
    maKhachHang:string,
    tenKhachHang:string,
    soDienThoai:string,
    email:string,
    diaChi:string,
    tinhTrang:string,
    ngayDangKy:Date
}

export interface ThemKhachHang{
    tenKhachHang:string,
    soDienThoai:string,
    email:string,
    diaChi:string,
    tinhTrang:string,
    ngayDangKy:Date
}

export interface SuaKhachHang{
    tenKhachHang:string,
    soDienThoai:string,
    email:string,
    diaChi:string,
    tinhTrang:string,
    ngayDangKy:Date
}

export interface SuaKhachHangDto{
    maKhachHang:string,
    tenKhachHang:string,
    soDienThoai:string,
    email:string,
    diaChi:string,
    tinhTrang:string,
    ngayDangKy:Date
}