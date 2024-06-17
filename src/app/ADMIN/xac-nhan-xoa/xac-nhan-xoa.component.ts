import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-xac-nhan-xoa',
  templateUrl: './xac-nhan-xoa.component.html',
  styleUrl: './xac-nhan-xoa.component.css'
})
export class XacNhanXoaComponent {
  constructor(
    public dialogRef: MatDialogRef<XacNhanXoaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
