import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    // url = 'https://commonly-relaxing-burro.ngrok-free.app/demo1-0.0.1-SNAPSHOT';
    url = 'http://localhost:8081';
    constructor(private http: HttpClient) {
    }
    login(param: any): Observable<any> {
        return this.http.post<any>(this.url + '/api/login', param);
    }
}
