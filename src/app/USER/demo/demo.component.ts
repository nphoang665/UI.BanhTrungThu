import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css'
})
export class DemoComponent implements OnInit {
  orders: Order[] = [
    { id: '12345', customerName: 'Nguyen Van A', status: 'Đang giao' },
    { id: '67890', customerName: 'Tran Thi B', status: 'Đã giao' },
    { id: '11223', customerName: 'Le Van C', status: 'Chờ xử lý' },
  ];

  constructor() { }

  ngOnInit(): void {
  }
  steps = [
    'Đặt hàng',
    'Xác nhận đơn hàng',
    'Đang vận chuyển',
    'Đã giao hàng'
  ];

  getStatusClass(status: string): string {
    switch (status) {
      case 'Đang giao':
        return 'text-yellow-500';
      case 'Đã giao':
        return 'text-green-500';
      case 'Chờ xử lý':
        return 'text-red-500';
      default:
        return '';
    }
  }
}
export interface Order{
  id:string,
  customerName:string,
  status:string
}