import { Component, OnInit } from '@angular/core';
import { SanPham } from '../../ADMIN/models/san-pham.model';
import { environment } from '../../../environments/environment';
import { GioHangService } from '../../ADMIN/services/GioHang/gio-hang.service';

@Component({
  selector: 'app-gio-hang',
  templateUrl: './gio-hang.component.html',
  styleUrl: './gio-hang.component.css'
})
export class GioHangComponent implements OnInit {

  cartItems: { sanPham: SanPham, quantity: number }[] = [];
  apiBaseUrl: string = environment.apiBaseUrl;

  constructor(private gioHangService: GioHangService) { }

  ngOnInit(): void {
    this.cartItems = this.gioHangService.getCartItems();
  }

  updateQuantity(sanPham: SanPham | undefined, event: Event): void {
    if (sanPham) {
      const inputElement = event.target as HTMLInputElement;
      const qty = parseInt(inputElement.value, 10);
      if (qty <= 0) {
        this.removeFromCart(sanPham);
      } else {
        this.gioHangService.updateCartItem(sanPham, qty);
      }
      this.cartItems = this.gioHangService.getCartItems(); // Cập nhật lại cartItems
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




  // cartItems: { sanPham: SanPham, quantity: number }[] = [];
  // apiBaseUrl: string = environment.apiBaseUrl;

  // constructor(private gioHangService: GioHangService) { }

  // ngOnInit(): void {
  //   this.cartItems = this.gioHangService.getCartItems();
  // }

  // updateQuantity(sanPham: SanPham | undefined, event: Event): void {
  //   if (sanPham) {
  //     const inputElement = event.target as HTMLInputElement;
  //     const qty = parseInt(inputElement.value, 10);
  //     if (qty <= 0) {
  //       this.removeFromCart(sanPham);
  //     } else {
  //       this.gioHangService.updateCartItem(sanPham, qty);
  //     }
  //   }
  // }

  // removeFromCart(sanPham: SanPham | undefined): void {
  //   if (sanPham) {
  //     this.gioHangService.removeFromCart(sanPham);
  //     this.cartItems = this.gioHangService.getCartItems();
  //   }
  // }

  // getTotal(): number {
  //   return this.cartItems.reduce((total, item) => total + (item.sanPham?.gia ?? 0) * item.quantity, 0);
  // }
}