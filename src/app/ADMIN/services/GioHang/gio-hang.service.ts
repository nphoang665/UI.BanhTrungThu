import { Injectable } from '@angular/core';
import { SanPham } from '../../models/san-pham.model';
import { KhachHang } from '../../models/khach-hang.model';

@Injectable({
  providedIn: 'root'
})
export class GioHangService {
  private storageKey = 'gioHang';

  constructor() {
    this.loadCartFromStorage();
  }

  private cartItems: { sanPham: SanPham, quantity: number, maKhachHang: string }[] = [];

  getCartItems(): { sanPham: SanPham, quantity: number, maKhachHang: string }[] {
    return this.cartItems;
  }

  DemSoLuong(): number {
    const gioHangs = localStorage.getItem(this.storageKey);
    if (gioHangs) {
      const gioHangParsed = JSON.parse(gioHangs);
      return gioHangParsed.length;
    }
    return 0;
  }

  addToCart(sanPham: SanPham, quantity: number = 1): void {
    const userLogin = localStorage.getItem('NguoiDung');
    if (userLogin === null) {
      alert("Dang nhap");
      return;
    }

    const user = JSON.parse(userLogin);
    const maKhachHang = user.maKhachHang;

    const existingItem = this.cartItems.find(item => item.sanPham.maSanPham === sanPham.maSanPham && item.maKhachHang === maKhachHang);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ sanPham, quantity, maKhachHang });
    }
    this.saveCartToStorage();
  }

  updateCartItem(sanPham: SanPham, quantity: number): void {
    const userLogin = localStorage.getItem('NguoiDung');
    if (userLogin === null) {
      alert("Dang nhap");
      return;
    }

    const user = JSON.parse(userLogin);
    const maKhachHang = user.maKhachHang;

    this.cartItems = this.cartItems.filter(item => !(item.sanPham.maSanPham === sanPham.maSanPham && item.maKhachHang === maKhachHang));
    this.saveCartToStorage();
    
    const item = this.cartItems.find(item => item.sanPham.maSanPham === sanPham.maSanPham && item.maKhachHang === maKhachHang);
    if (item) {
      item.quantity = quantity;
      this.saveCartToStorage();
    }
  }

  removeFromCart(sanPham: SanPham): void {
    const userLogin = localStorage.getItem('NguoiDung');
    if (userLogin === null) {
      alert("Dang nhap");
      return;
    }

    const user = JSON.parse(userLogin);
    const maKhachHang = user.maKhachHang;

    this.cartItems = this.cartItems.filter(item => !(item.sanPham.maSanPham === sanPham.maSanPham && item.maKhachHang === maKhachHang));
    this.saveCartToStorage();
  }

  clearCart(): void {
    const userLogin = localStorage.getItem('NguoiDung');
    if (userLogin === null) {
      alert("Dang nhap");
      return;
    }

    const user = JSON.parse(userLogin);
    const maKhachHang = user.maKhachHang;

    this.cartItems = this.cartItems.filter(item => item.maKhachHang !== maKhachHang);
    this.saveCartToStorage();
  }

  private saveCartToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
  }

  private loadCartFromStorage(): void {
    const storedCart = localStorage.getItem(this.storageKey);
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
    }
  }
  checkProductAvailability(): boolean {
    return this.cartItems.every(item => item.quantity <= item.sanPham.soLuongTrongKho);
  }
  
  // private cartItems: { sanPham: SanPham, quantity: number }[] = [];

  // addToCart(sanPham: SanPham, quantity: number): void {
  //   const existingItem = this.cartItems.find(item => item.sanPham.maSanPham === sanPham.maSanPham);
  //   if (existingItem) {
  //     existingItem.quantity += quantity;
  //   } else {
  //     this.cartItems.push({ sanPham, quantity });
  //   }
  // }

  // getCartItems(): { sanPham: SanPham, quantity: number }[] {
  //   return this.cartItems;
  // }

  // updateCartItem(sanPham: SanPham, quantity: number): void {
  //   const item = this.cartItems.find(item => item.sanPham.maSanPham === sanPham.maSanPham);
  //   if (item) {
  //     item.quantity = quantity;
  //   }
  // }

  // removeFromCart(sanPham: SanPham): void {
  //   this.cartItems = this.cartItems.filter(item => item.sanPham.maSanPham !== sanPham.maSanPham);
  // }

  // clearCart(): void {
  //   this.cartItems = [];
  // }
}