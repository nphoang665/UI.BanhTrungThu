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
  page: number = 1;
  selectedSortOption: string = 'best-seller';
  
  constructor(
    private route: ActivatedRoute,
    private loaiSanPhamService: LoaiSanPhamService,
    private sanPhamService:SanPhamService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
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
      this.sanPhams = data.filter(x => x.tinhTrang === 'Đang hoạt động');
      this.getAnhSanPham();
      this.sortProducts();
    });
  }

  getAnhSanPham(): void {
    for (const sanPham of this.sanPhams) {
      this.sanPhamService.getAnhSanPham(sanPham.maSanPham).subscribe((data: AnhSanPham[]) => {
        this.anhSanPham = data;
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
      this.sanPhamBanhTrungThu$ = this.sanPhamService.getAllSanPham();
    });
  }
  xemNhanhSP(id:string):void{
    this.OpenPopup(id, 'Xem nhanh sản phẩm');
  }

  sortProducts(): void {
    switch (this.selectedSortOption) {
      case 'product-asc':
        this.sanPhams.sort((a, b) => a.gia - b.gia);
        break;
      case 'product-desc':
        this.sanPhams.sort((a, b) => b.gia - a.gia);
        break;
      case 'best-seller':
        if (this.loaiSanPhamId) {
          this.sanPhamService.getSanPhamBanChayByLoai(this.loaiSanPhamId).subscribe((data: SanPham[]) => {
            this.sanPhams = data.filter(x => x.tinhTrang === 'Đang hoạt động'); 
          });
        }
        break;
      default:
        break;
    }
  }
  onSortChange(event: any): void {
    this.selectedSortOption = event.target.value;
    this.sortProducts();
  }
}