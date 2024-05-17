import { Component, OnInit } from '@angular/core';
export interface Product {
  img: string;
  title: string;
  price: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products:Product[] = [
    { img: 'https://www.banhngoncaocap.com/images/stories/virtuemart/product//20180810182955_Main-product-detail.png', title: 'Bánh Trung Thu Truyền Thống', price: 600000 },
    { img: 'https://www.banhngoncaocap.com/images/stories/virtuemart/product//20180810182955_Main-product-detail.png', title: 'Bánh Trung Thu Hiện Đại', price: 1600000 },
    { img: 'https://www.banhngoncaocap.com/images/stories/virtuemart/product//20180810182955_Main-product-detail.png', title: 'Bánh Trung Thu Thập Cẩm', price: 600000 },
    { img: 'https://www.banhngoncaocap.com/images/stories/virtuemart/product//20180810182955_Main-product-detail.png', title: 'Bánh Trung Thu Vị Trà Xanh', price: 600000 },
    { img: 'https://www.banhngoncaocap.com/images/stories/virtuemart/product//20180810182955_Main-product-detail.png', title: 'Bánh Trung Thu Sô Cô La', price: 600000 },
    { img: 'https://www.banhngoncaocap.com/images/stories/virtuemart/product//20180810182955_Main-product-detail.png', title: 'Bánh Trung Thu Trứng Muối', price: 600000 },
    { img: 'https://www.banhngoncaocap.com/images/stories/virtuemart/product//20180810182955_Main-product-detail.png', title: 'Bánh Trung Thu Dừa', price: 600000 },
    { img: 'https://www.banhngoncaocap.com/images/stories/virtuemart/product//20180810182955_Main-product-detail.png', title: 'Bánh Trung Thu Nhân Đậu Xanh', price: 600000 },
  ];

  visibleProducts:Product[] = [];
  currentStart = 0;
  productsPerPage = 4;

  ngOnInit(): void {
    this.showProducts(this.currentStart);
  }

  showProducts(startIndex: number): void {
    this.visibleProducts = this.products.slice(startIndex, startIndex + this.productsPerPage);
  }

  prev(): void {
    if (this.currentStart > 0) {
      this.currentStart -= this.productsPerPage;
      this.showProducts(this.currentStart);
    }
  }

  next(): void {
    if (this.currentStart + this.productsPerPage < this.products.length) {
      this.currentStart += this.productsPerPage;
      this.showProducts(this.currentStart);
    }
  }
}