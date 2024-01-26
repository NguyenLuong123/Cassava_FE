import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class LoadingService {
    // tslint:disable-next-line:variable-name
    private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    get isLoading(): Observable<boolean> {
        return this._isLoading.asObservable();
    }

    public startLoading(): void {
        this._isLoading.next(true);
    }

    public stopLoading(): void {
        this._isLoading.next(false);
    }
}
