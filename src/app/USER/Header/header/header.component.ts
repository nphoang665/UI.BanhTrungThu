import { Component } from '@angular/core';
import { GioHangComponent } from '../../gio-hang/gio-hang.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private dialog: MatDialog){}
  OpenPopup( title: any): void {
    const _popup = this.dialog.open(GioHangComponent, {
      width: '60%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data: {
        title: title,
      },
    });
    _popup.afterClosed().subscribe((item) => {
      // console.log(item);
    });
  }
  xemCart(): void {
    this.OpenPopup('Giỏ hàng');
  }
}
