import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { SanPham } from '../../ADMIN/models/san-pham.model';
import { SanPhamService } from '../../ADMIN/services/SanPham/san-pham.service';
import { LoaiSanPham } from '../../ADMIN/models/loai-san-pham.model';
import { LoaiSanPhamService } from '../../ADMIN/services/LoaiSanPham/loai-san-pham.service';

@Component({
  selector: 'app-chi-tiet-banh-trung-thu',
  templateUrl: './chi-tiet-banh-trung-thu.component.html',
  styleUrl: './chi-tiet-banh-trung-thu.component.css'
})
export class ChiTietBanhTrungThuComponent implements OnInit {
  sanPham: SanPham | null = null;
  loaiSanPham: LoaiSanPham | null = null;
  apiBaseUrl: string = environment.apiBaseUrl;

  constructor(
    private route: ActivatedRoute,
    private sanPhamService: SanPhamService,
    private loaiSanPhamService: LoaiSanPhamService
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
}