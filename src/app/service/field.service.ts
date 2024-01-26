import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FieldService {
    // url = 'https://commonly-relaxing-burro.ngrok-free.app/demo1-0.0.1-SNAPSHOT';
    url = 'http://localhost:8081'
    constructor(private http: HttpClient) {
    }

    getList(): Observable<any> {
        return this.http.post<any>
        (this.url +'/api/getListField', null);
    }

    getUpdateListField(): Observable<any> {
        return this.http.post<any>
        (this.url+'/api/getUpdateListField', null);
    }

    getModelField(param: any): Observable<any> {
        return this.http.post<any>
        (this.url + '/api/getModelField', param);
    }
    getModelCSV(param: any): Observable<any> {
        return this.http.post<any>
        (this.url + '/api/calculateCSV', param);
    }

    insertField(param: any): Observable<any> {
        return this.http.post<any>
        ( this.url + '/api/insertField', param);
    }

    deleteField(param: any): Observable<any> {
        return this.http.post<any>
        (this.url + '/api/deleteField', param);
    }

    updateCustomizedParameters(param: any): Observable<any> {
        return this.http.post<any>
        (this.url + '/api/updateCustomizedParameters', param);
    }

    setIrrigation(param: any): Observable<any> {
        return this.http.post<any>
        (this.url + '/api/setIrrigation', param);
    }

    getHistory(param: any): Observable<any> {
        return this.http.post<any>(this.url + '/api/getHistoryIrrigation', param);
    }

    getWeatherData(param: any): Observable<any> {
        return this.http.post<any>(this.url + '/api/getWeatherData', 'field1');
    }

    getHumidity(param: any): Observable<any> {
        return this.http.post<any>
        (this.url + '/api/getHumidity', param);
    }
    getDisease(param: any): Observable<any> {
        return this.http.post<any>
        (this.url + '/api/getDisease', param);
    }
    getField(param: any): Observable<any> {
        return this.http.post<any>
        (this.url + '/api/getField', param);
    }
}
