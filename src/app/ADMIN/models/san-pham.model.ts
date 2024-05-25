export interface SanPham{
    maSanPham:string,
    maLoai:string,
    tenSanPham:string,
    gia:number,
    moTa:string,
    soLuongTrongKho:string,
    ngayThem:string,
    tinhTrang:string, 
    anhSanPham:any,
}

export interface ThemSanPham{
    maLoai:string,
    tenSanPham:string,
    gia:number,
    moTa:string,
    soLuongTrongKho:string,
    ngayThem:string,
    tinhTrang:string, 
    imgSelected: any,
}

export interface SuaSanPham{
    maLoai:string,
    tenSanPham:string,
    gia:number,
    moTa:string,
    soLuongTrongKho:string,
    ngayThem:string,
    tinhTrang:string, 
    anhSanPhamDb:any,
    anhSanPhamBrowse:any
}

