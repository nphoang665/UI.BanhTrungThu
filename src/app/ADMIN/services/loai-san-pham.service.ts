import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaiSanPham, ThemLoaiSanPham } from '../models/loai-san-pham.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoaiSanPhamService {

  constructor(private http:HttpClient) { }

  themLoaiSanPham(data:ThemLoaiSanPham):Observable<LoaiSanPham>{
    return this.http.post<LoaiSanPham>(`${environment.apiBaseUrl}/api/LoaiSanPham`, data);
  }

  getAllLoaiSanPham():Observable<LoaiSanPham[]>{
    return this.http.get<LoaiSanPham[]>(`${environment.apiBaseUrl}/api/LoaiSanPham`)
  }
}
