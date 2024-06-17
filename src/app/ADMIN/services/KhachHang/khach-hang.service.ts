import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KhachHang, SuaKhachHang, ThemKhachHang } from '../../models/khach-hang.model';
import { Observable } from 'rxjs';
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
}
