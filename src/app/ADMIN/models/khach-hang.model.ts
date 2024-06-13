export interface KhachHang{
    maKhachHang:string,
    tenKhachHang:string,
    soDienThoai:string,
    email:string,
    diaChi:string,
    tinhTrang:string,
}

export interface ThemKhachHang{
    tenKhachHang:string,
    soDienThoai:string,
    email:string,
    diaChi:string,
    tinhTrang:string,
}

export interface SuaKhachHang{
    tenKhachHang:string,
    soDienThoai:string,
    email:string,
    diaChi:string,
    tinhTrang:string,
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