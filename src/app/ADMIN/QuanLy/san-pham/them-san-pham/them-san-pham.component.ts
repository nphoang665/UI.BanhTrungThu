import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { SanPhamService } from '../../../services/SanPham/san-pham.service';
import { ToastrService } from 'ngx-toastr';
import { LoaiSanPhamService } from '../../../services/LoaiSanPham/loai-san-pham.service';
import { LoaiSanPham } from '../../../models/loai-san-pham.model';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-them-san-pham',
  templateUrl: './them-san-pham.component.html',
  styleUrl: './them-san-pham.component.css'
})
export class ThemSanPhamComponent implements OnInit{
  selectedFile: any[] = [];
  previewingFileImg: any[] = [];
  LoaiSanPham:any[]=[]
  themSanPhamForm:FormGroup = new FormGroup({
    maLoai:new FormControl('',[Validators.required]),
    tenSanPham: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(70)]),
    gia: new FormControl('',[Validators.required, Validators.min(0),Validators.max(10000000)]),
    moTa: new FormControl('',[Validators.required, Validators.minLength(3)]),
    soLuongTrongKho: new FormControl('',[Validators.required, Validators.min(0),Validators.max(300)]),
    ngayThem: new FormControl(new Date()),
    tinhTrang: new FormControl(''),
  })

  constructor(
    private sanPhamServices:SanPhamService,
    private toastr: ToastrService,
    private loaiSanPhamServices:LoaiSanPhamService,
    private ref: MatDialogRef<ThemSanPhamComponent>,
  ){}

  ngOnInit(): void {
    
    this.loaiSanPhamServices.getAllLoaiSanPham().subscribe((data:LoaiSanPham[])=>{
      this.LoaiSanPham = data;
      // console.log(this.LoaiSanPham);
      
    })
  }
  ClosePopup() {
    this.ref.close();
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
        this.ClosePopup();
      }, error: (error) => {
        console.error('Lỗi khi thêm sản phẩm:', error);
      },
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
