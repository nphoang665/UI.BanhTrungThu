import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { SanPhamService } from '../../../services/SanPham/san-pham.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-them-san-pham',
  templateUrl: './them-san-pham.component.html',
  styleUrl: './them-san-pham.component.css'
})
export class ThemSanPhamComponent implements OnInit{
  selectedFile: any[] = [];
  previewingFileImg: any[] = [];
  themSanPhamForm:FormGroup = new FormGroup({
    maLoai:new FormControl(''),
    tenSanPham: new FormControl(''),
    gia: new FormControl(''),
    moTa: new FormControl(''),
    soLuongTrongKho: new FormControl(''),
    ngayHetHan: new FormControl(''),
    ngayNhap: new FormControl(''),
    tinhTrang: new FormControl(''),
  })

  constructor(
    private sanPhamServices:SanPhamService,
    private toastr: ToastrService,
  ){}

  ngOnInit(): void {
    
  }

  themSanPham(){
    if(this.previewingFileImg.length ===0){
      this.toastr.warning('Bạn chưa chọn ảnh', 'Thông báo', {
        timeOut: 1000,
      });
      return;
    }
    this.sanPhamServices.themSanPham(this.themSanPhamForm.value)
    .subscribe({
      next:(response)=>{
        console.log(response);
        this.toastr.success('Thêm sản phẩm thành công', 'Thông báo', {
          timeOut: 1000,
        });
      }
    })
  }
  onFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const reader = new FileReader();
        reader.onload = (e) => {
          // Khởi tạo hoặc lấy FormArray 'imgSelected'
          let imgSelectedControl = this.themSanPhamForm.get('imgSelected') as FormArray<any>;
          if (!imgSelectedControl) {
            imgSelectedControl = new FormArray<any>([]);
            this.themSanPhamForm.addControl('imgSelected', imgSelectedControl);
          }
          // Thêm new FormControl vào FormArray và ép kiểu
          imgSelectedControl.push(new FormControl(e.target?.result as string));
          // Thêm chuỗi Base64 vào mảng previewingFileImg
          this.previewingFileImg.push(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  }
  XoaImgPreviewing(index: number) {
    // Lấy FormArray 'imgSelected' và xóa FormControl tương ứng
    let imgSelectedControl = this.themSanPhamForm.get('imgSelected') as FormArray<any>;
    if (imgSelectedControl) {
      imgSelectedControl.removeAt(index);
    }

    // Xóa khỏi mảng previewingFileImg
    this.previewingFileImg.splice(index, 1);
  }

}
