import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DonHang, SuaDonHang, ThemDonHang } from '../../models/don-hang.model';
import { environment } from '../../../../environments/environment';
import { ChiTietDonhang, ThemChiTietDonhang } from '../../models/chi-tiet-don-hang.model';
import { DoanhThuTheoThang } from '../../models/DoanhThuThang.models';

@Injectable({
  providedIn: 'root'
})
export class DonHangService {

  constructor(private http:HttpClient) { }

  themDonHang(data:ThemDonHang):Observable<DonHang>{
    return this.http.post<DonHang>(`${environment.apiBaseUrl}/api/DonHang`, data);
  }

  suaDonHang(id:string,data:SuaDonHang):Observable<DonHang>{
    return this.http.put<DonHang>(`${environment.apiBaseUrl}/api/DonHang/${id}`,data);
  }

  getAllDonHang():Observable<DonHang[]>{
    return this.http.get<DonHang[]>(`${environment.apiBaseUrl}/api/DonHang`);
  }

  getDonHangById(id:string):Observable<DonHang>{
    return this.http.get<DonHang>(`${environment.apiBaseUrl}/api/DonHang/${id}`);
  }
  themChiTietDonHang(data: ThemChiTietDonhang): Observable<ChiTietDonhang> {
    return this.http.post<ChiTietDonhang>(`${environment.apiBaseUrl}/api/ChiTietDonHang`, data);
  }
  guiEmailThanhToan(id:string): Observable<DonHang> {
    return this.http.get<DonHang>(`${environment.apiBaseUrl}/api/Auth/GuiEmailChoKhachHang/${id}`);
  }
  getVnPayPaymentUrl(orderId: string, amount: string): Observable<{ paymentUrl: string }> {
    return this.http.get<{ paymentUrl: string }>(`${environment.apiBaseUrl}/api/DonHang/vnpay-payment-url?orderId=${orderId}&amount=${amount}`);
  }

  getLichSuMuaHang(maKhachHang: string): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/DonHang/lich-su-mua-hang/${maKhachHang}`);
  }
  
  getDoanhThuTheoThang():Observable<DoanhThuTheoThang[]>{
    return this.http.get<DoanhThuTheoThang[]>(`${environment.apiBaseUrl}/api/TongQuan/DoanhThuTheoThang`);
  }
}
