import { Component, OnInit } from '@angular/core';
import { SanPham } from '../../../ADMIN/models/san-pham.model';
import { GioHangService } from '../../../ADMIN/services/GioHang/gio-hang.service';
import { environment } from '../../../../environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DonHangService } from '../../../ADMIN/services/DonHang/don-hang.service';
import { ThemDonHang } from '../../../ADMIN/models/don-hang.model';
import { ThemChiTietDonhang } from '../../../ADMIN/models/chi-tiet-don-hang.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { KhachHangService } from '../../../ADMIN/services/KhachHang/khach-hang.service';
import { SuaKhachHang, SuaKhachHangDto } from '../../../ADMIN/models/khach-hang.model';

@Component({
  selector: 'app-thanh-toan',
  templateUrl: './thanh-toan.component.html',
  styleUrl: './thanh-toan.component.css'
})
export class ThanhToanComponent implements OnInit {
  myForm: FormGroup;
  cartItems: { sanPham: SanPham, quantity: number, maKhachHang: string }[] = [];
  apiBaseUrl: string = environment.apiBaseUrl;

  constructor(private gioHangService: GioHangService,private khachHangService:KhachHangService, private donHangService: DonHangService,private toastr: ToastrService,private router:Router) {
    this.myForm = new FormGroup({
      tenKhachHang: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(70)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(80)]),
      soDienThoai: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      diaChi: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      thongTinThanhToan: new FormControl('COD', Validators.required)
    });
  }

  ngOnInit(): void {
    this.cartItems = this.gioHangService.getCartItems();

    const userLogin = localStorage.getItem('NguoiDung');
    if (userLogin) {
    const user = JSON.parse(userLogin);
    this.myForm.patchValue({
      tenKhachHang: user.tenKhachHang,
      email: user.email,
      soDienThoai: user.soDienThoai,
      diaChi: user.diaChi
    });
  }
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + ((item.sanPham?.gia ?? 0) * item.quantity), 0);
  }

  updateKhachHang(): void {
    // console.log(this.myForm.value);

    const user = JSON.parse(localStorage.getItem('NguoiDung') || '{}');
    
    // Kiểm tra giá trị đầu vào của form
    const soDienThoai = this.myForm.value.soDienThoai;
    if (soDienThoai === undefined || soDienThoai === null || soDienThoai === '') {
      console.error('Giá trị số điện thoại không hợp lệ:', soDienThoai);
      this.toastr.error('Giá trị số điện thoại không hợp lệ', 'Thông báo', { timeOut: 1000 });
      return;
    }
  
    const updatedUser: SuaKhachHangDto = {
      maKhachHang: user.maKhachHang,
      tenKhachHang: this.myForm.value.tenKhachHang,
      email: this.myForm.value.email,
      soDienThoai: soDienThoai.toString(),  // Chuyển đổi số điện thoại thành chuỗi
      diaChi: this.myForm.value.diaChi,
      tinhTrang: user.tinhTrang,
      ngayDangKy: user.ngayDangKy
    };
  
    this.khachHangService.suaKhachHang(user.maKhachHang, updatedUser).subscribe({
      next: () => {
        const updatedUserWithId = { ...updatedUser, maKhachHang: user.maKhachHang };
        localStorage.setItem('NguoiDung', JSON.stringify(updatedUserWithId));
        // this.toastr.success('Cập nhật thông tin khách hàng thành công', 'Thông báo', { timeOut: 1000 });
      },
      error: (error) => {
        console.error('Lỗi khi cập nhật thông tin khách hàng:', error);
        this.toastr.error('Lỗi khi cập nhật thông tin khách hàng', 'Thông báo', { timeOut: 1000 });
      }
    });
  }
  

  thanhToan(): void {
    if (this.myForm.valid) {
      const userLogin = localStorage.getItem('NguoiDung');
      if (!userLogin) {
        alert('Vui lòng đăng nhập');
        return;
      }

      const user = JSON.parse(userLogin);
      const orderData: ThemDonHang = {
        maKhachHang: user.maKhachHang,
        thoiGianDatHang: new Date(),
        tongTien: this.getTotal().toString(),
        diaChiGiaoHang: this.myForm.value.diaChi,
        thongTinThanhToan: this.myForm.value.thongTinThanhToan,
        tinhTrang: 'Chưa xử lý',
      };

      this.donHangService.themDonHang(orderData).subscribe({
        next: (response) => {
          const maDonHang = response.maDonHang;
          const chiTietDonHang: ThemChiTietDonhang[] = this.cartItems.map(item => ({
            maDonHang,
            maSanPham: item.sanPham.maSanPham,
            soLuong: item.quantity,
            gia: item.sanPham.gia
          }));

          chiTietDonHang.forEach(chiTiet => {
            this.donHangService.themChiTietDonHang(chiTiet).subscribe({
              next: () => {
                // Xử lý thành công chi tiết đơn hàng
              },
              error: (error) => {
                console.error('Lỗi khi thêm chi tiết đơn hàng:', error);
              }
            });
          });

          if (this.myForm.value.thongTinThanhToan === 'Bank') {
            this.donHangService.getVnPayPaymentUrl(maDonHang, orderData.tongTien).subscribe({
              next: (data) => {
                window.location.href = data.paymentUrl;
              },
              error: (error) => {
                console.error('Lỗi khi lấy URL thanh toán VNPay:', error);
                this.toastr.error('Lỗi khi lấy URL thanh toán VNPay', 'Thông báo', { timeOut: 1000 });
              }
            });
          } else {
            // Hiển thị thông báo thành công
            this.donHangService.guiEmailThanhToan(maDonHang).subscribe((response)=>{
                   
            });
            this.toastr.success('Đặt hàng thành công', 'Thông báo', { timeOut: 1000 });
            this.toastr.success('Vui lòng kiểm tra email để xem chi tiết', 'Thông báo', { timeOut: 2000 });      
            // Cập nhật thông tin khách hàng
            this.updateKhachHang(); 
            
            // Xóa giỏ hàng
            this.gioHangService.clearCart();
            // Chuyển hướng người dùng về trang home
            this.router.navigateByUrl('/home');
          }
        },
        error: (error) => {
          console.error('Lỗi khi đặt hàng:', error);
        }
      });
    } else {
      // Hiển thị thông báo lỗi nếu form không hợp lệ
      this.toastr.error('Vui lòng điền đầy đủ thông tin giao hàng', 'Thông báo', { timeOut: 1000 });
    }
  }
}