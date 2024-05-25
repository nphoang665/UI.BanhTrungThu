import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { SanPham } from '../../ADMIN/models/san-pham.model';
import { SanPhamService } from '../../ADMIN/services/SanPham/san-pham.service';
import { LoaiSanPham } from '../../ADMIN/models/loai-san-pham.model';
import { LoaiSanPhamService } from '../../ADMIN/services/LoaiSanPham/loai-san-pham.service';
import { GioHangService } from '../../ADMIN/services/GioHang/gio-hang.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chi-tiet-banh-trung-thu',
  templateUrl: './chi-tiet-banh-trung-thu.component.html',
  styleUrl: './chi-tiet-banh-trung-thu.component.css'
})
export class ChiTietBanhTrungThuComponent implements OnInit {
  sanPham: SanPham | null = null;
  loaiSanPham: LoaiSanPham | null = null;
  apiBaseUrl: string = environment.apiBaseUrl;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private sanPhamService: SanPhamService,
    private loaiSanPhamService: LoaiSanPhamService,
    private gioHangService:GioHangService,
    private toastr: ToastrService,
  ) {}
  
  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadSanPham(id);   
      }
    });
  }
  
  loadSanPham(id: string): void {
    this.sanPhamService.getSanPhamById(id).subscribe((data: SanPham) => {
      this.sanPham = data;
    }, error => {
      console.error('Error loading SanPham:', error);
    });
  }

  loadLoaiSanPham(maLoai: string): void {
    this.loaiSanPhamService.getLoaiSanPhamById(maLoai).subscribe((data: LoaiSanPham) => {
      this.loaiSanPham = data;
    }, error => {
      console.error('Error loading LoaiSanPham:', error);
    });
  }
  addToCart(): void {
    if (this.sanPham) {
      this.gioHangService.addToCart(this.sanPham, this.quantity);
      this.toastr.success('Thêm sản phẩm vào giỏ hàng thành công', 'Thông báo', {
        timeOut: 1000,
      });
    }
  }
}