import { Component, Inject } from '@angular/core';
import { SanPham } from '../../ADMIN/models/san-pham.model';
import { AnhSanPham } from '../../ADMIN/models/anh-san-pham.model';
import { LoaiSanPham } from '../../ADMIN/models/loai-san-pham.model';
import { environment } from '../../../environments/environment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SanPhamService } from '../../ADMIN/services/SanPham/san-pham.service';
import { GioHangService } from '../../ADMIN/services/GioHang/gio-hang.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-xem-nhanh-san-pham',
  templateUrl: './xem-nhanh-san-pham.component.html',
  styleUrl: './xem-nhanh-san-pham.component.css'
})
export class XemNhanhSanPhamComponent {
  selectedImage!: string;
  images!: string[];
  tenSanPham!: string;
  giaSanPham!: number;
  soLuong: number = 1;
  apiBaseUrl: string = environment.apiBaseUrl;
  sanPham: SanPham | null = null;
  HetHangSP: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanPhamService: SanPhamService,
    private gioHangService: GioHangService,
    private toastr: ToastrService,
    private router:Router,
    private ref: MatDialogRef<XemNhanhSanPhamComponent>,
  ) {}

  ngOnInit(): void {
    this.loadSanPham(this.data.idSanPham);
  }

  loadSanPham(idSanPham: string) {
    this.sanPhamService.getSanPhamById(idSanPham).subscribe((sanPham: SanPham) => {
      this.HetHangSP = sanPham.soLuongTrongKho === 0;
      this.sanPham = sanPham;
      this.selectedImage = this.apiBaseUrl + '/images/' + sanPham.anhSanPham[0].tenAnh; // Assuming the first image is the main image
      this.images = sanPham.anhSanPham.map((anh: AnhSanPham) => this.apiBaseUrl + '/images/' + anh.tenAnh);
      this.tenSanPham = sanPham.tenSanPham;
      this.giaSanPham = sanPham.gia;
    });
  }

  selectImage(image: string) {
    this.selectedImage = image;
  }
  ClosePopup() {
    this.ref.close();
  }

  addToCart(): void {
    const userLogin = localStorage.getItem('NguoiDung');
    if (userLogin === null) {
       this.router.navigateByUrl('/login');
       this.ClosePopup();
       this.toastr.error('Bạn chưa đăng nhập!', 'Lỗi', {
        timeOut: 2000,
      });
      return;
    }

    if (this.soLuong < 1) {
      this.toastr.error('Số lượng sản phẩm phải lớn hơn 0', 'Lỗi', {
        timeOut: 2000,
      });
      return;
    }
    if (this.sanPham) {
      const success = this.gioHangService.addToCart(this.sanPham, this.soLuong);
      if (this.HetHangSP) { 
        this.toastr.error('Sản phẩm hiện đang hết hàng', 'Lỗi', {
          timeOut: 2000,
        });
        return;
      }
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