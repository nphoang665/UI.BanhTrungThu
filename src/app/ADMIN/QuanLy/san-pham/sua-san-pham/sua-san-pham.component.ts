import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SanPham, SuaSanPham } from '../../../models/san-pham.model';
import { ActivatedRoute } from '@angular/router';
import { SanPhamService } from '../../../services/SanPham/san-pham.service';
import { LoaiSanPhamService } from '../../../services/LoaiSanPham/loai-san-pham.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoaiSanPham } from '../../../models/loai-san-pham.model';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-sua-san-pham',
  templateUrl: './sua-san-pham.component.html',
  styleUrl: './sua-san-pham.component.css'
})
export class SuaSanPhamComponent implements OnInit {
  id?: string | null = null;
  model?: SanPham;
  LoaiSanPham: any[] = []
  inputdata: any;

  suaSanPhamForm: FormGroup = new FormGroup({
    maLoai: new FormControl(''),
    tenSanPham: new FormControl(''),
    gia: new FormControl(''),
    moTa: new FormControl(''),
    soLuongTrongKho: new FormControl(''),
    ngayThem: new FormControl(''),
    tinhTrang: new FormControl(''),
  })
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<SuaSanPhamComponent>,
    private sanPhamServices: SanPhamService,
    private loaiSanPhamServices: LoaiSanPhamService,
    private toastr: ToastrService,
  ) { }


  ngOnInit(): void {
console.log(this.model?.ngayThem);

    this.loaiSanPhamServices.getAllLoaiSanPham().subscribe((data: LoaiSanPham[]) => {
      this.LoaiSanPham = data;
      // console.log(this.LoaiSanPham);

    })

    this.inputdata = this.data;
    this.id = this.data.idSanPham;
    if (this.id) {
      this.sanPhamServices.getSanPhamById(this.id).subscribe((data: SanPham) => {
        if (data) {
          this.model = data;
          this.HienThiAnhPreview();
          this.initalizeForm();
        } else {
          console.error('không tìm thấy sản phẩm', this.id);
        }
      });
    }
  }

  initalizeForm(): void {
    this.suaSanPhamForm = new FormGroup({
      maSanPham: new FormControl(this.model?.maSanPham),
      tenSanPham: new FormControl(this.model?.tenSanPham),
      maLoai: new FormControl(this.model?.maLoai),
      moTa: new FormControl(this.model?.moTa),
      gia: new FormControl(this.model?.gia),
      tinhTrang: new FormControl(this.model?.tinhTrang),
      ngayThem: new FormControl(this.model?.ngayThem),
      soLuongTrongKho: new FormControl(this.model?.soLuongTrongKho),
    })
  }
  ClosePopup() {
    this.ref.close();
  }


  fileImgPreviewFromDb: any[] = [];
  HienThiAnhPreview() {
    for (let index = 0; index < this.model?.anhSanPham.length; index++) {
      const stringHttpsImg = environment.apiBaseUrl + '/Images/' + this.model?.anhSanPham[index].tenAnh;
      this.fileImgPreviewFromDb.push(stringHttpsImg);
      console.log(this.fileImgPreviewFromDb);

    }
  }

  //hàm thêm mới ảnh
  //khai báo mảng chứa file thêm mới chưa có trong db
  fileImgPreviewFromBrowse: any[] = [];
  OnFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const reader = new FileReader();
        reader.onload = (e) => {
          this.fileImgPreviewFromBrowse.push(e.target?.result as string);
          // console.log(e.target?.result as string);

        }
        reader.readAsDataURL(file);

      }
    }


  }

  //xóa ảnh previewing
  //khai báo mảng chứa những phần tử trong db được người dùng xóa
  arrImgPreviewClientHandle: any[] = [];
  XoaImgPreviewing(item: any) {
    //duyệt xem item có trong arr không? 
    // 1. Duyệt trong mảng fileImgPreviewFromDb xem đã có dữ liệu chưa? 
    let found_fileImgPreviewFromDb = this.fileImgPreviewFromDb.find(el => el === item);
    if (found_fileImgPreviewFromDb) {
      //nếu tìm thấy trong mảng found_fileImgPreviewFromDb
      console.log('có trong mảng fileImgPreviewFromDb');
      // 3. Nếu fileImgPreviewFromDb có thì xóa và dừng hàm.
      // dùng filter để xóa phần tử trong mảng
      this.arrImgPreviewClientHandle.push(item);
      this.fileImgPreviewFromDb = this.fileImgPreviewFromDb.filter(itm => itm !== item);
      return;
    }
    else {
      // 2. Nếu không có tiếp tục duyệt mảng fileImgPreviewFromBrowse xem có chưa? 
      let found_fileImgPreviewFromBrowse = this.fileImgPreviewFromBrowse.find(el => el === item);
      if (found_fileImgPreviewFromBrowse) {
        // nếu tìm thấy trong mảng fileImgPreviewFromBrowse 
        // 4. Nếu fileImgPreviewFromBrowse có thì xóa và dừng hàm. 
        console.log('có trong mảng fileImgPreviewFromBrowse');
        // dùng filter để xóa phần tử trong mảng
        this.fileImgPreviewFromBrowse = this.fileImgPreviewFromBrowse.filter(itm => itm !== item);
        return;
      }
      else {

        // 5. Nếu cả 2 không có thì log exception
        console.log("Không tìm thấy ảnh trong 2 mảng");

      }
    }
  }

  suaSanPham(event: Event) {
    if (this.fileImgPreviewFromDb.length === 0 && this.fileImgPreviewFromBrowse.length === 0) {
      this.toastr.warning('Một tour phải có ít nhất 1 ảnh', 'Thông báo', {
        timeOut: 1000,
      });
      return;
    }

    if (this.model && this.id) {
      const suaSanPham: SuaSanPham = { ...this.suaSanPhamForm.value };
      suaSanPham.anhSanPhamBrowse = this.fileImgPreviewFromBrowse;
      suaSanPham.anhSanPhamDb = this.arrImgPreviewClientHandle;
      this.sanPhamServices.suaSanPham(this.id, suaSanPham).subscribe({
        next: (response) => {
          console.log(response);
          this.toastr.success('Sửa sản phẩm thành công', 'Thông báo', {
            timeOut: 1000,
          });
        }
      })
      this.ref.close();
    }
  }

}
