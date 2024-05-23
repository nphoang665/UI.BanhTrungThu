import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoaiSanPham } from '../../../models/loai-san-pham.model';
import { ToastrService } from 'ngx-toastr';
import { LoaiSanPhamService } from '../../../services/LoaiSanPham/loai-san-pham.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-sua-loai-san-pham',
  templateUrl: './sua-loai-san-pham.component.html',
  styleUrl: './sua-loai-san-pham.component.css'
})
export class SuaLoaiSanPhamComponent implements OnInit {
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  model?:LoaiSanPham;
  inputdata: any;
  apiBaseUrl: string = environment.apiBaseUrl;
  myForm : FormGroup = new FormGroup({
    maLoai: new FormControl(''),
    tenLoai: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(70)]),
    anhLoai: new FormControl('')
  })


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<SuaLoaiSanPhamComponent>,
    private loaiSanPhamServices: LoaiSanPhamService,
    private toastr: ToastrService,
  ) { }
  id?: string | null = null;

  ngOnInit(): void {
    this.inputdata = this.data;
    this.id = this.data.idLoaiSanPham;
    if (this.id) {
      this.loaiSanPhamServices.getLoaiSanPhamById(this.id).subscribe((data: LoaiSanPham) => {
        if (data) {
          this.model = data;
          this.initalizeForm();
          if (this.model.anhLoai) {
            this.imagePreview = `${this.apiBaseUrl}/Images/${this.model.anhLoai}`;
          }
        } else {
          console.error('Không tìm thấy loại sản phẩm', this.id);
        }
      });
    }
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

  initalizeForm():void{
    // console.log('Model:', this.model);
   this.myForm = new FormGroup({
    maLoai: new FormControl(this.model?.maLoai),
    tenLoai: new FormControl(this.model?.tenLoai, [Validators.required, Validators.minLength(3), Validators.maxLength(70)]),
    anhLoai: new FormControl(this.model?.anhLoai),
   })
  }
  ClosePopup() {
    this.ref.close();
  }

  suaLoaiSanPham(event: Event): void {
    if (this.model && this.id) {
      const updateData = this.myForm.value;
      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = (reader.result as string).split(',')[1];
          updateData.anhLoai = `data:${this.selectedFile?.type};base64,${base64String}`;

          this.updateLoaiSanPham(updateData);
        };
        reader.readAsDataURL(this.selectedFile);
      } else {
        this.updateLoaiSanPham(updateData);
      }
    }
  }

  updateLoaiSanPham(data: any): void {
    this.loaiSanPhamServices.suaLoaiSanPham(this.id!, data).subscribe({
      next: (response) => {
        // console.log(response);
        this.toastr.success('Sửa loại sản phẩm thành công', 'Thông báo', {
          timeOut: 1000,
        });
        this.ref.close();
      },
      error: (err) => {
        console.error('Lỗi khi sửa loại sản phẩm', err);
      }
    });
  }
}
