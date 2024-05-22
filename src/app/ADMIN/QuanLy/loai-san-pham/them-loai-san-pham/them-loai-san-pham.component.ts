import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoaiSanPhamService } from '../../../services/LoaiSanPham/loai-san-pham.service';

@Component({
  selector: 'app-them-loai-san-pham',
  templateUrl: './them-loai-san-pham.component.html',
  styleUrl: './them-loai-san-pham.component.css'
})
export class ThemLoaiSanPhamComponent implements OnInit{
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  myForm: FormGroup = new FormGroup({
    tenLoai: new FormControl(''),
    anhLoai: new FormControl(''),
  })

  constructor(    
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ThemLoaiSanPhamComponent>,
    private loaiSanPhamServices: LoaiSanPhamService,
    private toastr: ToastrService,){
    
  }
  ClosePopup() {
    this.ref.close();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  ngOnInit(): void {

  }

  themLoaiSanPham(){
    if (this.myForm.invalid || !this.selectedFile) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1];
      const request = {
        tenLoai: this.myForm.get('tenLoai')?.value,
        anhLoai: `data:${this.selectedFile?.type};base64,${base64String}`
      };

    this.loaiSanPhamServices.themLoaiSanPham(request).subscribe({
      next:(response)=>{
        console.log(response);
        this.toastr.success('Thêm loại sản phẩm thành công', 'Thông báo', {
          timeOut: 1000,
        });
        
        this.ClosePopup();
      }, error: (error) => {
        console.error('Lỗi khi thêm loại sản phẩm:', error);
      },
    })
  }
  reader.readAsDataURL(this.selectedFile);

}
}
