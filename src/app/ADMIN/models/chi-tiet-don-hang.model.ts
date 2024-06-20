export interface ChiTietDonhang{
    maChiTiet:string,
    maDonHang:string,
    maSanPham:string,
    soLuong:number,
    gia:number,
}

export interface ChiTietDonhangDto{
    maChiTiet:string,
    maDonHang:string,
    maSanPham:string,
    soLuong:number,
    gia:number,
    sanPham:any
}

// export interface ChiTietDonhangDto{
//     maChiTiet:string,
//     maDonHang:string,
//     maSanPham:string,
//     soLuong:number,
//     gia:number,
//     khachHang: any,
//     sanPham:any,
// }


export interface ThemChiTietDonhang{
    maDonHang:string,
    maSanPham:string,
    soLuong:number,
    gia:number
}
export interface SuaChiTietDonhang{
    maDonHang:string,
    maSanPham:string,
    soLuong:number,
    gia:number
}
