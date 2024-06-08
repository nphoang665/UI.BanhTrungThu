import { Component, OnInit } from '@angular/core';
import { SanPham } from '../../ADMIN/models/san-pham.model';
import { environment } from '../../../environments/environment';
import { GioHangService } from '../../ADMIN/services/GioHang/gio-hang.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gio-hang',
  templateUrl: './gio-hang.component.html',
  styleUrl: './gio-hang.component.css'
})
export class GioHangComponent implements OnInit {

  cartItems: { sanPham: SanPham, quantity: number, maKhachHang: string }[] = [];
  apiBaseUrl: string = environment.apiBaseUrl;

  constructor(private gioHangService: GioHangService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.cartItems = this.gioHangService.getCartItems();
  }

  // updateQuantity(sanPham: SanPham | undefined, event: Event): void {
  //   if (sanPham) {
  //     const inputElement = event.target as HTMLInputElement;
  //     const qty = parseInt(inputElement.value, 10);
  //     if (qty <= 0) {
  //       this.removeFromCart(sanPham);
  //     } else {
  //       if (this.gioHangService.checkProductAvailability(sanPham, qty)) {
  //         this.gioHangService.updateCartItem(sanPham, qty);
  //         this.cartItems = this.gioHangService.getCartItems();
  //       } else {
  //         alert('Số lượng sản phẩm vượt quá số lượng trong kho');
  //       }
  //     }
  //   }
  // }
  updateQuantity(sanPham: SanPham, event: Event): void {
    if (sanPham) {
      const inputElement = event.target as HTMLInputElement;
      const qty = parseInt(inputElement.value, 10);

      if (isNaN(qty) || qty <= 0) {
        this.toastr.error('Số lượng sản phẩm phải lớn hơn 0', 'Lỗi', {
          timeOut: 1500,
        })
        // alert('Số lượng phải là một số nguyên dương hợp lệ');
        const currentCartItem = this.gioHangService.getCartItems().find(item => item.sanPham.maSanPham === sanPham.maSanPham);
        if (currentCartItem) {
          inputElement.value = currentCartItem.quantity.toString();
        }
        return;
      }

      if (this.gioHangService.checkProductAvailability(sanPham, qty)) {
        this.gioHangService.updateCartItem(sanPham, qty);
        this.cartItems = this.gioHangService.getCartItems();
      } else {
        // alert('Số lượng sản phẩm vượt quá số lượng trong kho');
        this.toastr.error('Số lượng sản phẩm vượt quá số lượng trong kho', 'Lỗi', {
          timeOut: 1500,
        })
        const currentCartItem = this.gioHangService.getCartItems().find(item => item.sanPham.maSanPham === sanPham.maSanPham);
        if (currentCartItem) {
          inputElement.value = currentCartItem.quantity.toString();
        }
      }
    }
  }

  removeFromCart(sanPham: SanPham | undefined): void {
    if (sanPham) {
      this.gioHangService.removeFromCart(sanPham);
      this.cartItems = this.gioHangService.getCartItems();
    }
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + ((item.sanPham?.gia ?? 0) * item.quantity), 0);
  }
}