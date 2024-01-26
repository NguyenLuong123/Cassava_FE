import {Component} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";

@Component({
    selector: 'app-login',
    templateUrl: './app.login.component.html',
    providers: [MessageService]
})
export class AppLoginComponent {
    user: any;
    password: any;
    isLoading = false;

    constructor(
        private messageService: MessageService,
        private router: Router,
        private userService: UserService
    ) {
    }

    loginUser() {
        if (!this.user || !this.password) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Thông báo',
                detail: 'Vui lòng điền tên đăng nhập và mật khẩu'
            });
            return;
        }
        const param = {
            email: this.user,
            password: this.password,
        };
        this.isLoading = true;
        this.userService.login(param).subscribe(res => {
            if (res.success) {
                setTimeout(() => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Thông báo',
                        detail: 'Đăng nhập thành công'
                    });
                }, 1000);
                localStorage.setItem('USER', res.data.userName);
                setTimeout(() => {
                    this.router.navigate(['/Home']);
                }, 2000);
                // this.router.navigate(['/Home']);
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Thông báo',
                    detail: 'Đăng nhập không thành công. Tên đăng nhập hoặc mật khẩu sai !!'
                });
            }
            this.isLoading = false;
        });
    }
}
