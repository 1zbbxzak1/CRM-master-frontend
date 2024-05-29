import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IRegistrationRequestModel} from "../../request-models/auth/IRegistration.request-model";
import {ILoginRequestModel} from "../../request-models/auth/ILogin.request-model";
import {inject} from "@angular/core";
import {Params} from "@angular/router";
import {environment} from "../../../../environments/environment";

export class AuthService {


    private readonly _http: HttpClient = inject(HttpClient);
    private readonly _apiUrl: string = `${environment.apiUrl}/auth`;

    public registerUser(user: IRegistrationRequestModel): Observable<any> {
        return this._http.post(`${this._apiUrl}/register`, user, {withCredentials: true});
    }

    public loginUser(user: ILoginRequestModel): Observable<any> {
        return this._http.post(`${this._apiUrl}/login`, user, {withCredentials: true});
    }

    public externalLoginWithVk(payload: Params) {
        return this._http.post(`${this._apiUrl}/externalLogin/vk`, {payload}, {withCredentials: true});
    }

    public externalGet(payload: string): Observable<any> {
        return this._http.get<any>(`${this._apiUrl}/externalLogin/vk?payload=${payload}`, {withCredentials: true});
    }

    public logoutUser(): Observable<any> {
        return this._http.post(`${this._apiUrl}/logout`, {withCredentials: true});
    }
}
