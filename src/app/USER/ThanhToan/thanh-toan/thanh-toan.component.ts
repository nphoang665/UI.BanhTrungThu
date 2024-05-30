import { Component, OnInit } from '@angular/core';
import { SanPham } from '../../../ADMIN/models/san-pham.model';
import { GioHangService } from '../../../ADMIN/services/GioHang/gio-hang.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-thanh-toan',
  templateUrl: './thanh-toan.component.html',
  styleUrl: './thanh-toan.component.css'
})
export class ThanhToanComponent implements OnInit {
  cartItems: { sanPham: SanPham, quantity: number }[] = [];
  apiBaseUrl: string = environment.apiBaseUrl;

  constructor(private gioHangService: GioHangService) { }

  ngOnInit(): void {
    this.cartItems = this.gioHangService.getCartItems();
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + ((item.sanPham?.gia ?? 0) * item.quantity), 0);
  }
  thanhToan(){
    this.gioHangService.getCartItems
  }
}