import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KhachHang, SuaKhachHang, ThemKhachHang } from '../../models/khach-hang.model';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KhachHangService {

  constructor(private http:HttpClient) { }

  themKhachHang(data:ThemKhachHang):Observable<KhachHang>{
    return this.http.post<KhachHang>(`${environment.apiBaseUrl}/api/KhachHang`, data);
  }

  suaKhachHang(id:string,data:SuaKhachHang):Observable<KhachHang>{
    return this.http.put<KhachHang>(`${environment.apiBaseUrl}/api/KhachHang/${id}`,data);
  }

  getAllKhachHang():Observable<KhachHang[]>{
    return this.http.get<KhachHang[]>(`${environment.apiBaseUrl}/api/KhachHang`);
  }

  getKhachHangById(id:string):Observable<KhachHang>{
    return this.http.get<KhachHang>(`${environment.apiBaseUrl}/api/KhachHang/${id}`);
  }
  xoaKhachHang(id:string):Observable<KhachHang>{
    return this.http.delete<KhachHang>(`${environment.apiBaseUrl}/api/KhachHang/${id}`)
  }

  checkSDT(soDienThoai:string): Observable<boolean> {
    return this.getAllKhachHang().pipe(
        map((data: KhachHang[]) => {
            let existssoDienThoai = data.filter(s => s.soDienThoai == soDienThoai);
            // console.log(existssoDienThoai);
            return existssoDienThoai.length > 0;
        })
    );
    }
    checkEmail(email:string): Observable<boolean> {
    return this.getAllKhachHang().pipe(
        map((data: KhachHang[]) => {
            let existsemail = data.filter(s => s.email == email);
            // console.log(existsemail);
            return existsemail.length > 0;
        })
    );
    }

    ExportExcel() {
      return this.http.get(`${environment.apiBaseUrl}/api/KhachHang/ExportKhachHang`, {
        observe: 'response', responseType: 'blob'
      })
    }
}
