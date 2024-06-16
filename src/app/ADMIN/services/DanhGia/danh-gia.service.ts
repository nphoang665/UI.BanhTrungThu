import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DanhGiaService {

  constructor(private http:HttpClient) { }
  getDanhGiaBySanPham(maSanPham: string): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/DanhGia/${maSanPham}`);
  }

  addDanhGia(danhGia: any): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/api/DanhGia`,danhGia);
  }
}
