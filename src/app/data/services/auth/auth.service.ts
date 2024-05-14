import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IRegistrationRequestModel} from "../../request-models/auth/IRegistration.request-model";
import {ILoginRequestModel} from "../../request-models/auth/ILogin.request-model";
import {inject} from "@angular/core";
import {Params} from "@angular/router";

export class AuthService {


    private readonly _http: HttpClient = inject(HttpClient);

    public registerUser(user: IRegistrationRequestModel): Observable<any> {
        return this._http.post('http://localhost:8080/auth/register', user, {withCredentials: true});
    }

    public loginUser(user: ILoginRequestModel): Observable<any> {
        return this._http.post('http://localhost:8080/auth/login', user, {withCredentials: true});
    }

    public externalLoginWithVk(payload: Params) {
        return this._http.post('http://localhost:8080/auth/externalLogin/vk', {payload}, {withCredentials: true});
    }

    public externalGet(payload: string) {
        return this._http.get<any>(`http://localhost:8080/auth/externalLogin/vk?payload=${payload}`, {withCredentials: true});
    }

    public logoutUser(): Observable<any> {
        return this._http.post('http://localhost:8080/auth/logout', {withCredentials: true});
    }
}
