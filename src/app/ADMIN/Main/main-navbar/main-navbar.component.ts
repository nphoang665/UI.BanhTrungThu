import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Auth/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../Auth/models/user.model';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrl: './main-navbar.component.css'
})
export class MainNavbarComponent implements OnInit{
  user?: User;
  constructor(private authService:AuthService,private router:Router){}

  ngOnInit(): void {
    this.authService.user()
    .subscribe({
      next: (response) => {
        this.user = response;
      }
    });

    this.user = this.authService.getUser();
  }
  onLogout():void{
    this.authService.logout();
    window.location.reload();
    this.router.navigateByUrl('/home');
  }
}
