import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { SanPham } from '../../ADMIN/models/san-pham.model';
import { SanPhamService } from '../../ADMIN/services/SanPham/san-pham.service';
import { LoaiSanPham } from '../../ADMIN/models/loai-san-pham.model';
import { LoaiSanPhamService } from '../../ADMIN/services/LoaiSanPham/loai-san-pham.service';
import { GioHangService } from '../../ADMIN/services/GioHang/gio-hang.service';
import { ToastrService } from 'ngx-toastr';
import { AnhSanPham } from '../../ADMIN/models/anh-san-pham.model';

@Component({
  selector: 'app-chi-tiet-banh-trung-thu',
  templateUrl: './chi-tiet-banh-trung-thu.component.html',
  styleUrl: './chi-tiet-banh-trung-thu.component.css'
})
export class ChiTietBanhTrungThuComponent implements OnInit {
  selectedImage!: string;
  images!: string[];
  sanPham: SanPham | null = null;
  loaiSanPham: LoaiSanPham | null = null;
  apiBaseUrl: string = environment.apiBaseUrl;
  quantity: number = 1;
  HetHangSP: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private sanPhamService: SanPhamService,
    private loaiSanPhamService: LoaiSanPhamService,
    private gioHangService: GioHangService,
    private toastr: ToastrService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadSanPham(id);   
      }
    });
  }
  selectImage(image: string) {
    this.selectedImage = image;
  }

  loadSanPham(id: string): void {
    this.sanPhamService.getSanPhamById(id).subscribe((data: SanPham) => {
      this.sanPham = data;
      this.selectedImage = this.apiBaseUrl + '/images/' + data.anhSanPham[0].tenAnh; // Assuming the first image is the main image
      this.images = data.anhSanPham.map((anh: AnhSanPham) => this.apiBaseUrl + '/images/' + anh.tenAnh);
      this.HetHangSP = data.soLuongTrongKho === 0;
      if (data.maLoai) {
        this.loadLoaiSanPham(data.maLoai);
      }
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
    const userLogin = localStorage.getItem('NguoiDung');
    if (userLogin === null) {
       this.router.navigateByUrl('/login')
       this.toastr.error('Bạn chưa đăng nhập!', 'Lỗi', {
        timeOut: 2000,
      });
      return;
    }

    if (this.quantity < 1) {
      this.toastr.error('Số lượng sản phẩm phải lớn hơn 0', 'Lỗi', {
        timeOut: 2000,
      });
      return;
    }
    if (this.sanPham) {
      if (this.HetHangSP) { 
        this.toastr.error('Sản phẩm hiện đang hết hàng', 'Lỗi', {
          timeOut: 2000,
        });
        return;
      }
      const success = this.gioHangService.addToCart(this.sanPham, this.quantity);
      if (success) {
        this.toastr.success('Thêm sản phẩm vào giỏ hàng thành công', 'Thông báo', {
          timeOut: 2000,
        });
      } else {
        this.toastr.error('Số lượng sản phẩm vượt quá số lượng trong kho', 'Lỗi', {
          timeOut: 2000,
        });
      }
    }
  }
}