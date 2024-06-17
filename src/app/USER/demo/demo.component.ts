import { Component, OnInit } from '@angular/core';
interface Product {
  name: string;
  imageUrl: string;
}
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css'
})
export class DemoComponent implements OnInit {
 
  ngOnInit(): void {
  }
  searchTerm: string = '';
  products: Product[] = [
    { name: 'Trăng vàng pha lê', imageUrl: 'https://www.banhngoncaocap.com/cache/resized/829724613c5fd3145693197a44e64032.png' },
    { name: 'Trăng vàng bạch kim', imageUrl: 'https://www.banhngoncaocap.com/cache/resized/829724613c5fd3145693197a44e64032.png' },
    { name: 'Bánh Trứng Vi Cá', imageUrl: 'https://www.banhngoncaocap.com/cache/resized/829724613c5fd3145693197a44e64032.png' },
    { name: 'Khoai Môn Hạt Sen', imageUrl: 'https://www.banhngoncaocap.com/cache/resized/829724613c5fd3145693197a44e64032.png' },
    { name: 'Bánh Xanh Mè Đen Hạt Dưa', imageUrl: 'https://www.banhngoncaocap.com/cache/resized/829724613c5fd3145693197a44e64032.png' },
    { name: 'Bánh Xanh Hạt Sen Hạt Chia', imageUrl: 'https://www.banhngoncaocap.com/cache/resized/829724613c5fd3145693197a44e64032.png' },
    { name: 'Bánh Trung Thu Oreo 2 Bánh', imageUrl: 'https://www.banhngoncaocap.com/cache/resized/829724613c5fd3145693197a44e64032.png' },
    { name: 'Bánh Trung Thu Oreo 4 Bánh', imageUrl: 'https://www.banhngoncaocap.com/cache/resized/829724613c5fd3145693197a44e64032.png' },
  ];

  get filteredProducts() {
    return this.products.filter(product => 
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}