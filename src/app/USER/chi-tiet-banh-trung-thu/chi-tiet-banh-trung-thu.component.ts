import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chi-tiet-banh-trung-thu',
  templateUrl: './chi-tiet-banh-trung-thu.component.html',
  styleUrl: './chi-tiet-banh-trung-thu.component.css'
})
export class ChiTietBanhTrungThuComponent implements OnInit {
  product: any | undefined;;

  products = [
    {
      id: 1,
      name: 'Bánh Trung Thu Truyền Thống',
      description: 'Bánh trung thu truyền thống với nhân đậu xanh và trứng muối.',
      price: 120000,
      image: 'assets/images/mooncake1.jpg',
      details: 'Chi tiết về Bánh Trung Thu Truyền Thống...'
    },
    {
      id: 2,
      name: 'Bánh Trung Thu Hiện Đại',
      description: 'Bánh trung thu với hương vị hiện đại, thích hợp cho giới trẻ.',
      price: 150000,
      image: 'assets/images/mooncake2.jpg',
      details: 'Chi tiết về Bánh Trung Thu Hiện Đại...'
    },
    // Thêm các sản phẩm khác ở đây
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(productId)) {
      this.product = this.products.find(p => p.id === productId);
    }
  }
}