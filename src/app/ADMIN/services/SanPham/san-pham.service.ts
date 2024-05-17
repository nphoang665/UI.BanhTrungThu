import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SanPham, SuaSanPham, ThemSanPham } from '../../models/san-pham.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

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

  getAllSanPham():Observable<SanPham[]>{
    return this.http.get<SanPham[]>(`${environment.apiBaseUrl}/api/SanPham`)
  }

  getSanPhamById(id:string):Observable<SanPham>{
    return this.http.get<SanPham>(`${environment.apiBaseUrl}/api/SanPham/${id}`)
  }

}
