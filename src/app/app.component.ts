import {Component, HostListener, OnInit} from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {DataService} from "./service/data.service";
import {FieldService} from "./service/field.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

    topbarTheme = 'blue';

    menuTheme = 'light';

    layoutMode = 'light';

    menuMode = 'static';

    inlineMenuPosition = 'bottom';

    inputStyle = 'filled';

    ripple = true;

    isRTL = false;
    constructor(private primengConfig: PrimeNGConfig, private dataService: DataService, private field: FieldService) {}

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.field.getWeatherData('field1').subscribe(res => {
            localStorage.setItem("weather", JSON.stringify(res));
        });
        // Lấy thời điểm cuối cùng khi trình duyệt tắt
        const lastShutdownTime = localStorage.getItem('lastShutdownTime');

        // Nếu đã có thời điểm và đã qua 30 phút, xóa dữ liệu
        if (lastShutdownTime) {
            const currentTime = new Date().getTime();
            const shutdownTime = parseInt(lastShutdownTime, 10);

            if (currentTime - shutdownTime > 30 * 60 * 1000) {
                localStorage.removeItem('USER');
                localStorage.removeItem('lastShutdownTime');
            }
        }

        // Đặt thời điểm cuối cùng khi ứng dụng khởi chạy
        localStorage.setItem('lastShutdownTime', new Date().getTime().toString());

    }
    @HostListener('window:beforeunload', ['$event'])
    unloadHandler(event: Event) {
        this.dataService.clearData("weather");
    }
}
