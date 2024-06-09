export interface DonHang{
    maDonHang:string,
    maKhachHang:string,
    thoiGianDatHang:Date,
    tongTien:string,
    diaChiGiaoHang:string,
    thongTinThanhToan:string,
    tinhTrang:string,
}

export interface DonHangDto{
    maDonHang:string,
    maKhachHang:string,
    thoiGianDatHang:Date,
    tongTien:string,
    diaChiGiaoHang:string,
    thongTinThanhToan:string,
    tinhTrang:string,
    khachHang:any,
    chiTietDonHang:any
}

export interface ThemDonHang{
    maKhachHang:string,
    thoiGianDatHang:Date,
    tongTien:string,
    diaChiGiaoHang:string,
    thongTinThanhToan:string,
    tinhTrang:string,
}

export interface SuaDonHang{
    maKhachHang:string,
    thoiGianDatHang:Date,
    tongTien:string,
    diaChiGiaoHang:string,
    thongTinThanhToan:string,
    tinhTrang:string,
}