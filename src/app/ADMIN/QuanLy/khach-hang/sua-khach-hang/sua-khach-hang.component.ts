import { Component, Inject, OnInit } from '@angular/core';
import { KhachHang } from '../../../models/khach-hang.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { KhachHangService } from '../../../services/KhachHang/khach-hang.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sua-khach-hang',
  templateUrl: './sua-khach-hang.component.html',
  styleUrl: './sua-khach-hang.component.css'
})
export class SuaKhachHangComponent implements OnInit{
  model?:KhachHang;
  inputdata:any;
  myForm:FormGroup = new FormGroup({
    maKhachHang:new FormControl(''),
    tenKhachHang:new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(70)]),
    soDienThoai:new FormControl('',[Validators.required, Validators.minLength(7), Validators.maxLength(11)]),
    email:new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(80)]),
    diaChi:new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    tinhTrang:new FormControl(''),
  })
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<SuaKhachHangComponent>,
    private khachHangServices: KhachHangService,
    private toastr: ToastrService,
  ) { }
  id?: string | null = null;
  ngOnInit(): void {
    this.inputdata = this.data;
    this.id = this.data.idKhachHang;
    if (this.id) {
      this.khachHangServices.getKhachHangById(this.id).subscribe((data: KhachHang) => {
        if (data) {
          this.model = data;
          this.initalizeForm();
        } else {
          console.error('không tìm thấy khách hàng', this.id);
        }
      });
    }
  }

  initalizeForm():void{
    console.log('Model:', this.model);
   this.myForm = new FormGroup({
    maKhachHang: new FormControl(this.model?.maKhachHang),
    tenKhachHang: new FormControl(this.model?.tenKhachHang,[Validators.required, Validators.minLength(3), Validators.maxLength(70)]),
    soDienThoai: new FormControl(this.model?.soDienThoai,[Validators.required, Validators.minLength(7), Validators.maxLength(11)]),
    email: new FormControl(this.model?.email,[Validators.required, Validators.minLength(3), Validators.maxLength(80)]),
    diaChi: new FormControl(this.model?.diaChi,[Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    tinhTrang: new FormControl(this.model?.tinhTrang),
    ngayDangKy: new FormControl(this.model?.ngayDangKy)
   })
  }
  ClosePopup() {
    this.ref.close();
  }

  suaKhachHang(event:Event){
    
    if(this.model && this.id){
      this.khachHangServices.suaKhachHang(this.id,this.myForm.value).subscribe({
        next:(response)=>{
          console.log(response);
          this.toastr.success('Sửa khách hàng thành công', 'Thông báo', {
            timeOut: 2000,
          });
        }
      })
      this.ref.close();
    }
  }

}
