import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SanPham, SuaSanPham, ThemSanPham } from '../../models/san-pham.model';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AnhSanPham } from '../../models/anh-san-pham.model';

@Injectable({
  providedIn: 'root'
})
export class SanPhamService {


  constructor(private http:HttpClient) { }
  themSanPham(data:ThemSanPham):Observable<SanPham>{
    return this.http.post<SanPham>(`${environment.apiBaseUrl}/api/SanPham`, data);
  }

  suaSanPham(id:string,data:SuaSanPham):Observable<SanPham>{
    return this.http.put<SanPham>(`${environment.apiBaseUrl}/api/SanPham/${id}`,data)
  }

  xoaSanPham(id:string):Observable<SanPham>{
    return this.http.delete<SanPham>(`${environment.apiBaseUrl}/api/SanPham/${id}`)
  }

  getAllSanPham():Observable<SanPham[]>{
    return this.http.get<SanPham[]>(`${environment.apiBaseUrl}/api/SanPham`)
  }

  getSanPhamById(id:string):Observable<SanPham>{
    return this.http.get<SanPham>(`${environment.apiBaseUrl}/api/SanPham/${id}`)
  }
  getAnhSanPham(maSanPham: string): Observable<AnhSanPham[]> {
    return this.http.get<AnhSanPham[]>(`${environment.apiBaseUrl}/api/AnhSanPham/${maSanPham}`);
  }

  getSanPhamByLoai(maLoai: string): Observable<SanPham[]> {
    return this.http.get<SanPham[]>(`${environment.apiBaseUrl}/api/SanPham/Loai/${maLoai}`);
}


  // getSanPhamMoi(): Observable<SanPham[]> {
  //   return this.getAllSanPham().pipe(
  //     map(sanPhams => {
  //       // Lấy ngày hiện tại
  //       const ngayHienTai = new Date();
  //       // Lọc các sản phẩm có ngày nhập gần đây (ví dụ: trong vòng 7 ngày)
  //       return sanPhams.filter(sp => {
  //         const ngayThem = new Date(sp.ngayThem);
  //         const thoiGianToiDa = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
  //         return ngayHienTai.getTime() - ngayThem.getTime() <= thoiGianToiDa;
  //       });
  //     })
  //   );
  // }
  getSanPhamMoi(): Observable<SanPham[]> {
    return this.getAllSanPham().pipe(
      map(sanPhams => {
        // Lấy ngày hiện tại
        const ngayHienTai = new Date();
        // Lọc các sản phẩm có ngày nhập gần đây và tình trạng "Đang hoạt động"
        return sanPhams.filter(sp => {
          const ngayThem = new Date(sp.ngayThem);
          const thoiGianToiDa = 100 * 24 * 60 * 60 * 1000; // 7 ngày tính bằng milliseconds
          const isActive = sp.tinhTrang === 'Đang hoạt động';
          const isRecent = ngayHienTai.getTime() - ngayThem.getTime() <= thoiGianToiDa;
          return isActive && isRecent;
        });
      })
    );
  }
  

  getSanPhamNoiBat(): Observable<SanPham[]> {
    return this.http.get<SanPham[]>(`${environment.apiBaseUrl}/api/SanPham/noibat`);
  }
  getSanPhamBanChayByLoai(maLoai: string): Observable<SanPham[]> {
    return this.http.get<SanPham[]>(`${environment.apiBaseUrl}/api/sanpham/banchaynhat/${maLoai}`);
  }

  ExportExcel() {
    return this.http.get(`${environment.apiBaseUrl}/api/SanPham/ExportSanPham`, {
      observe: 'response', responseType: 'blob'
    })
  }
}
