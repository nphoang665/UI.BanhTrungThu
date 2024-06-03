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

  addToCart(sanPham: SanPham, quantity: number = 1): boolean {
    const userLogin = localStorage.getItem('NguoiDung');
    if (userLogin === null) {
      alert("Dang nhap");
      return false;
    }

    const user = JSON.parse(userLogin);
    const maKhachHang = user.maKhachHang;

    const existingItem = this.cartItems.find(item => item.sanPham.maSanPham === sanPham.maSanPham && item.maKhachHang === maKhachHang);
    const newQuantity = existingItem ? existingItem.quantity + quantity : quantity;

    if (!this.checkProductAvailability(sanPham, newQuantity)) {
      return false;
    }

    if (existingItem) {
      existingItem.quantity = newQuantity;
    } else {
      this.cartItems.push({ sanPham, quantity, maKhachHang });
    }

    this.saveCartToStorage(maKhachHang);
    return true;
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
    
    const item = this.cartItems.find(item => item.sanPham.maSanPham === sanPham.maSanPham && item.maKhachHang === maKhachHang);
    if (item) {
      item.quantity = quantity;
    } else {
      this.cartItems.push({ sanPham, quantity, maKhachHang });
    }
    this.saveCartToStorage(maKhachHang);
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
    this.saveCartToStorage(maKhachHang);
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
    this.saveCartToStorage(maKhachHang);
  }

  private saveCartToStorage(maKhachHang: string): void {
    const userCart = this.cartItems.filter(item => item.maKhachHang === maKhachHang);
    localStorage.setItem(`${this.storageKey}_${maKhachHang}`, JSON.stringify(userCart));
  }

  private loadCartFromStorage(): void {
    const userLogin = localStorage.getItem('NguoiDung');
    if (userLogin !== null) {
      const user = JSON.parse(userLogin);
      const maKhachHang = user.maKhachHang;
      const storedCart = localStorage.getItem(`${this.storageKey}_${maKhachHang}`);
      if (storedCart) {
        this.cartItems = JSON.parse(storedCart);
      }
    }
  }

  checkProductAvailability(sanPham: SanPham, quantity: number): boolean {
    return quantity <= sanPham.soLuongTrongKho;
  }
}