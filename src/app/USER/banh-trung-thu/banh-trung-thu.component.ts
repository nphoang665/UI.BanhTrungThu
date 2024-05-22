import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaiSanPham } from '../../ADMIN/models/loai-san-pham.model';
import { SanPhamService } from '../../ADMIN/services/SanPham/san-pham.service';
import { LoaiSanPhamService } from '../../ADMIN/services/LoaiSanPham/loai-san-pham.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-banh-trung-thu',
  templateUrl: './banh-trung-thu.component.html',
  styleUrl: './banh-trung-thu.component.css'
})
export class BanhTrungThuComponent implements OnInit {
  apiBaseUrl: string = environment.apiBaseUrl;
  loaiSanPhamsWithCounts: { loaiSanPham: LoaiSanPham, count: number }[] = [];

  constructor(private sanPhamService: SanPhamService,private loaiSanPhamService: LoaiSanPhamService) { }

  ngOnInit(): void {
    this.getLoaiSanPhamWithCounts();
  }

  getLoaiSanPhamWithCounts(): void {
    this.loaiSanPhamService.getAllLoaiSanPhamWithCounts()
      .subscribe(
        data => {
          this.loaiSanPhamsWithCounts = data;
          console.log(this.loaiSanPhamsWithCounts); // Kiểm tra xem dữ liệu có được lấy thành công không
        },
        error => {
          console.error('Error fetching loaiSanPhamsWithCounts:', error);
        }
      );
  }




  // products = [
  //   {
  //     name: 'Bánh Chay ',
  //     description: '3 sản phẩm',
  //     image: 'https://www.banhngoncaocap.com/images/stories/virtuemart/category//cate-banh-chay.jpg'
  //   },
  //   {
  //     name: 'Bánh Dẻo ',
  //     description: '14 sản phẩm',
  //     image: 'https://www.banhngoncaocap.com/images/stories/virtuemart/category//cate-banh-deo.jpg'
  //   },
  //   {
  //     name: 'Bánh nướng 0 trứng ',
  //     description: '5 sản phẩm',
  //     image: 'https://www.banhngoncaocap.com/images/stories/virtuemart/category//cate-banh-nuong-0trung.jpg'
  //   },
  //   {
  //     name: 'Bánh Nướng 0 Trứng ',
  //     description: '0 sản phẩm',
  //     image: 'https://www.banhngoncaocap.com/images/stories/virtuemart/category//cate-banh-nuong-2trung.jpg'
  //   },
  //   {
  //     name: 'Bánh Nướng 1 Trứng  ',
  //     description: '12 sản phẩm',
  //     image: 'https://www.banhngoncaocap.com/images/stories/virtuemart/category//cate-banh-nuong-4trung.jpg'
  //   },
  //   {
  //     name: 'Bánh Nướng 2 Trứng ',
  //     description: '11 sản phẩm',
  //     image: 'https://www.banhngoncaocap.com/images/stories/virtuemart/category//cate-banh-nuong-4trung.jpg'
  //   }
  // ];
}