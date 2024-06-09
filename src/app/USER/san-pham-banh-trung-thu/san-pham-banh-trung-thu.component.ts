import { Component, OnInit } from '@angular/core';
import { SanPham } from '../../ADMIN/models/san-pham.model';
import { ActivatedRoute } from '@angular/router';
import { LoaiSanPhamService } from '../../ADMIN/services/LoaiSanPham/loai-san-pham.service';
import { SanPhamService } from '../../ADMIN/services/SanPham/san-pham.service';
import { environment } from '../../../environments/environment';
import { AnhSanPham } from '../../ADMIN/models/anh-san-pham.model';
import { LoaiSanPham } from '../../ADMIN/models/loai-san-pham.model';
import { XemNhanhSanPhamComponent } from '../xem-nhanh-san-pham/xem-nhanh-san-pham.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-san-pham-banh-trung-thu',
  templateUrl: './san-pham-banh-trung-thu.component.html',
  styleUrl: './san-pham-banh-trung-thu.component.css'
})
export class SanPhamBanhTrungThuComponent implements OnInit{
  sanPhamBanhTrungThu$?:Observable<SanPham[]>
  sanPhams: SanPham[] = [];
  anhSanPham: AnhSanPham[] = [];
  loaiSanPham: LoaiSanPham | null = null;
  loaiSanPhamId: string | null = null;
  apiBaseUrl: string = environment.apiBaseUrl;
  
  constructor(
    private route: ActivatedRoute,
    private loaiSanPhamService: LoaiSanPhamService,
    private sanPhamService:SanPhamService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // console.log(this.loaiSanPham?.tenLoai);
    
    this.route.paramMap.subscribe(params => {
      this.loaiSanPhamId = params.get('idLoaiSanPham');
      if (this.loaiSanPhamId) {
        this.loadSanPhams(this.loaiSanPhamId);
        this.loadLoaiSanPham(this.loaiSanPhamId)
      }
    });
  }
  loadLoaiSanPham(idLoaiSanPham: string): void {
    this.loaiSanPhamService.getLoaiSanPhamById(idLoaiSanPham).subscribe((data: LoaiSanPham) => {
      this.loaiSanPham = data;
    });
  }
  
  loadSanPhams(idLoaiSanPham: string): void {
    this.sanPhamService.getSanPhamByLoai(idLoaiSanPham).subscribe((data: SanPham[]) => {
      this.sanPhams = data;
      // Gọi hàm để lấy ảnh sản phẩm khi load xong danh sách sản phẩm
      this.getAnhSanPham();
    });
  }

  getAnhSanPham(): void {
    // Duyệt qua danh sách sản phẩm để lấy ảnh cho mỗi sản phẩm
    for (const sanPham of this.sanPhams) {
      this.sanPhamService.getAnhSanPham(sanPham.maSanPham).subscribe((data: AnhSanPham[]) => {
        this.anhSanPham = data;
        // Gán URL ảnh vào thuộc tính ảnh của từng sản phẩm
        sanPham.anhSanPham = this.anhSanPham;
      });
    }
  }

  OpenPopup(id: any, title: any): void {
    const _popup = this.dialog.open(XemNhanhSanPhamComponent, {
      width: '80%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data: {
        title: title,
        idSanPham: id 
      },
    });
    _popup.afterClosed().subscribe((item) => {
      // console.log(item);
      this.sanPhamBanhTrungThu$ = this.sanPhamService.getAllSanPham();
    });
  }
  xemNhanhSP(id:string):void{
    this.OpenPopup(id, 'Xem nhanh sản phẩm');
    // console.log('kaskdaksd:'+id);
    
  }
}