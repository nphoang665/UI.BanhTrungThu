import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { Register } from '../models/register.model';
import { environment } from '../../../environments/environment';
import { LoginResponse } from '../models/login-response.model';
import { LoginRequest } from '../models/login-request.model';
import { GoogleLoginDto } from '../models/login-google.model';
import { isPlatformBrowser } from '@angular/common';
import { MaXacNhan } from '../../ADMIN/models/ma-xac-nhan.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient,
    private cookieService: CookieService,
    private toastr:ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
  }

  quenMatKhau(email: string): Observable<MaXacNhan> {
    return this.http.post<MaXacNhan>(`${environment.apiBaseUrl}/api/Auth/quen-mat-khau/${email}`, {});
  }

  createAcount(data: Register): Observable<Register> {
    return this.http.post<Register>(`${environment.apiBaseUrl}/api/auth/register`, data);
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    // console.log(request);



    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/login`, {
      email: request.email,
      password: request.password
    })
  }

  // googleLogin(request: GoogleLoginDto): Observable<LoginResponse> {
  //   return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/google-login`, {
  //     idToken: request.idToken
  //   });
  // }
  googleLogin(data: GoogleLoginDto): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/google-login`, data).pipe(
      tap(result => {
        // console.log(result);
        this.toastr.success('Đăng nhập băng google thành công', 'Thông báo', {
          timeOut: 2000,
        });
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('user-email', result.email);
          localStorage.setItem('user-roles', result.roles.join(','));
          if (result.khachHang != null) {
            localStorage.setItem('NguoiDung', JSON.stringify(result.khachHang));
          }
        }
      })
    );
  }

  // setUser(user: User): void {
  //   this.$user.next(user);
  //   localStorage.setItem('user-email', user.email);
  //   localStorage.setItem('user-roles', user.roles.join(','));
  // }

  setUser(user: User): void {
    this.$user.next(user);
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
  }

  user(): Observable<User | undefined> {
    return this.$user.asObservable();
  }

  getUser(): User | undefined {
    if (isPlatformBrowser(this.platformId)) {
      const email = localStorage.getItem('user-email');
      const roles = localStorage.getItem('user-roles');
      const nguoiDung = localStorage.getItem('NguoiDung');

      if (email && roles && nguoiDung) {
        const user: User = {
          email: email,
          roles: roles.split(','),
          ...JSON.parse(nguoiDung)
        };
        return user;
      }
    }
    return undefined;

  }



  // logout(): void {
  //   if (isPlatformBrowser(this.platformId)) {
  //     localStorage.clear();
  //     this.cookieService.deleteAll('Authorization', 'http://localhost:4200/');

  //     this.$user.next(undefined);
  //   }
  // }
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Xóa các key cụ thể liên quan đến tài khoản
      localStorage.removeItem('user-email');
      localStorage.removeItem('user-roles');
      localStorage.removeItem('NguoiDung');
      localStorage.removeItem('token');
      
      // Xóa cookie Authorization
      this.cookieService.delete('Authorization', '/', 'localhost', false, 'Lax');
  
      this.$user.next(undefined);
    }
  }

  LayLaiMatKhau(data: RequestData): Observable<any> {
    return this.http.post<RequestData>(`${environment.apiBaseUrl}/api/Auth/QuenMatKhau`, data);
  }
  
}

export interface RequestData {
  optionOtp: string,
  email: string;
  matKhauMoi: string,
}