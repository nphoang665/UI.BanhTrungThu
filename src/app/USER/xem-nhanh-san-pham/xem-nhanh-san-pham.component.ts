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
  productTitle!: string;
  productPrice!: number;
  quantity: number = 1;
  apiBaseUrl: string = environment.apiBaseUrl;
  sanPham: SanPham | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanPhamService: SanPhamService,
    private gioHangService: GioHangService,
    private toastr: ToastrService,
    private router:Router,
    private ref: MatDialogRef<XemNhanhSanPhamComponent>,
  ) {}

  ngOnInit(): void {
    this.loadProductDetails(this.data.idSanPham);
  }

  loadProductDetails(idSanPham: string) {
    this.sanPhamService.getSanPhamById(idSanPham).subscribe((product: SanPham) => {
      this.sanPham = product;
      this.selectedImage = this.apiBaseUrl + '/images/' + product.anhSanPham[0].tenAnh; // Assuming the first image is the main image
      this.images = product.anhSanPham.map((anh: AnhSanPham) => this.apiBaseUrl + '/images/' + anh.tenAnh);
      this.productTitle = product.tenSanPham;
      this.productPrice = product.gia;
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
        timeOut: 1000,
      });
      return;
    }

    if (this.quantity < 1) {
      this.toastr.error('Số lượng sản phẩm phải lớn hơn 0', 'Lỗi', {
        timeOut: 1000,
      });
      return;
    }
    if (this.sanPham) {
      const success = this.gioHangService.addToCart(this.sanPham, this.quantity);
      if (success) {
        this.toastr.success('Thêm sản phẩm vào giỏ hàng thành công', 'Thông báo', {
          timeOut: 1000,
        });
      } else {
        this.toastr.error('Số lượng sản phẩm vượt quá số lượng trong kho', 'Lỗi', {
          timeOut: 1000,
        });
      }
    }
  }
}