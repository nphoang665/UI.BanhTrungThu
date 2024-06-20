import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChiTietDonhang } from '../../models/chi-tiet-don-hang.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DonHangChiTietService {


  constructor(private http:HttpClient) { }
  getAllDonHangChiTiet():Observable<ChiTietDonhang[]>{
    return this.http.get<ChiTietDonhang[]>(`${environment.apiBaseUrl}/api/ChiTietDonHang`);
  }
  getChiTietDonHangById(id:string):Observable<ChiTietDonhang>{
    return this.http.get<ChiTietDonhang>(`${environment.apiBaseUrl}/api/ChiTietDonHang/${id}`);
  }
}
