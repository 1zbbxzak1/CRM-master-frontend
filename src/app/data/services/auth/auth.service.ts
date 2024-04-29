import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IRegistrationRequestModel} from "../../request-models/auth/IRegistration.request-model";
import {ILoginRequestModel} from "../../request-models/auth/ILogin.request-model";
import {inject} from "@angular/core";

export class AuthService {

    private readonly _http: HttpClient = inject(HttpClient);

    public registerUser(user: IRegistrationRequestModel): Observable<any> {
        return this._http.post('http://localhost:8080/auth/register', user, {withCredentials: true});
    }

    public loginUser(user: ILoginRequestModel): Observable<any> {
        return this._http.post('http://localhost:8080/auth/login', user, {withCredentials: true});
    }

    public logoutUser(): Observable<any> {
        return this._http.post('http://localhost:8080/auth/logout', {withCredentials: true});
    }
}
