import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaiSanPham, SuaLoaiSanPham, ThemLoaiSanPham } from '../../models/loai-san-pham.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoaiSanPhamService {

  constructor(private http:HttpClient) { }

  themLoaiSanPham(data:ThemLoaiSanPham):Observable<LoaiSanPham>{
    return this.http.post<LoaiSanPham>(`${environment.apiBaseUrl}/api/LoaiSanPham`, data);
  }

  suaLoaiSanPham(id:string,data:SuaLoaiSanPham):Observable<LoaiSanPham>{
    return this.http.put<LoaiSanPham>(`${environment.apiBaseUrl}/api/LoaiSanPham/${id}`,data)
  }

  getAllLoaiSanPham():Observable<LoaiSanPham[]>{
    return this.http.get<LoaiSanPham[]>(`${environment.apiBaseUrl}/api/LoaiSanPham`)
  }

  getLoaiSanPhamById(id:string):Observable<LoaiSanPham>{
    return this.http.get<LoaiSanPham>(`${environment.apiBaseUrl}/api/LoaiSanPham/${id}`)
  }
}
