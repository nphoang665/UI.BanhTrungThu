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

  private cartItems: { sanPham: SanPham, quantity: number }[] = [];

  getCartItems(): { sanPham: SanPham, quantity: number }[] {
    return this.cartItems;
  }
  DemSoLuong():number{
    var gioHangs = localStorage.getItem(this.storageKey);
    if(gioHangs){
      var gioHangParsed = JSON.parse(gioHangs);
    }
    

    var soLuongSp = gioHangParsed.length;
    // console.log(soLuongSp);
    
    return soLuongSp;
  }

  addToCart(sanPham: SanPham, quantity: number = 1): void {
    const userLogin = localStorage.getItem('NguoiDung');
    if(userLogin==undefined){
      alert("dang nhap")
      return ;
    }
    const user=JSON.parse(userLogin);
    console.log(user.maKhachHang);
    
    const existingItem = this.cartItems.find(item => item.sanPham.maSanPham === sanPham.maSanPham);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ sanPham, quantity });
    }
    this.saveCartToStorage();
  }

  updateCartItem(sanPham: SanPham, quantity: number): void {
    const item = this.cartItems.find(item => item.sanPham.maSanPham === sanPham.maSanPham);
    if (item) {
      item.quantity = quantity;
      this.saveCartToStorage();
    }
  }

  removeFromCart(sanPham: SanPham): void {
    this.cartItems = this.cartItems.filter(item => item.sanPham.maSanPham !== sanPham.maSanPham);
    this.saveCartToStorage();
  }

  clearCart(): void {
    this.cartItems = [];
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