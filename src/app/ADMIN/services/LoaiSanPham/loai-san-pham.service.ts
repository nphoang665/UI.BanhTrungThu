import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaiSanPham, SuaLoaiSanPham, ThemLoaiSanPham } from '../../models/loai-san-pham.model';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SanPhamService } from '../SanPham/san-pham.service';
import { SanPham } from '../../models/san-pham.model';

@Injectable({
  providedIn: 'root'
})
export class LoaiSanPhamService {

  constructor(private http:HttpClient,private sanPhamService:SanPhamService) { }

  themLoaiSanPham(data:ThemLoaiSanPham):Observable<LoaiSanPham>{
    return this.http.post<LoaiSanPham>(`${environment.apiBaseUrl}/api/LoaiSanPham`, data);
  }

  suaLoaiSanPham(id:string,data:SuaLoaiSanPham):Observable<LoaiSanPham>{
    return this.http.put<LoaiSanPham>(`${environment.apiBaseUrl}/api/LoaiSanPham/${id}`,data)
  }

  xoaLoaiSanPham(id:string):Observable<LoaiSanPham>{
    return this.http.delete<LoaiSanPham>(`${environment.apiBaseUrl}/api/LoaiSanPham/${id}`)
  }

  getAllLoaiSanPham():Observable<LoaiSanPham[]>{
    return this.http.get<LoaiSanPham[]>(`${environment.apiBaseUrl}/api/LoaiSanPham`)
  }

  getLoaiSanPhamById(id:string):Observable<LoaiSanPham>{
    return this.http.get<LoaiSanPham>(`${environment.apiBaseUrl}/api/LoaiSanPham/${id}`)
  }

  getAllLoaiSanPhamWithCounts(): Observable<{ loaiSanPham: LoaiSanPham, count: number }[]> {
    return this.getAllLoaiSanPham().pipe(
      switchMap((loaiSanPhams: LoaiSanPham[]) => {
        const requests: Observable<number>[] = loaiSanPhams.map(loaiSanPham =>
          this.sanPhamService.getSanPhamByLoai(loaiSanPham.maLoai).pipe(
            map((sanPhams: any[]) => {
              // console.log(`LoaiSanPham: ${loaiSanPham.maLoai}`, sanPhams); 
              return sanPhams.filter(x=>x.tinhTrang==='Đang hoạt động').length;
            })
          )
        );
        return forkJoin(requests).pipe(
          map(counts => loaiSanPhams.map((loaiSanPham, index) => ({ loaiSanPham, count: counts[index] })))
        );
      })
    );
  }

  ExportExcel() {
    return this.http.get(`${environment.apiBaseUrl}/api/LoaiSanPham/ExportLoaiSanPham`, {
      observe: 'response', responseType: 'blob'
    })
  }
  
}
