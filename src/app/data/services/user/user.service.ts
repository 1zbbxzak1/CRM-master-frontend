import {inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUserRequestModel} from "../../request-models/user/IUser.request-model";
import {IPasswordRequestModel} from "../../request-models/user/IPassword.request-model";

export class UserService {

    private readonly _http: HttpClient = inject(HttpClient);

    public getUserInfo(): Observable<any> {
        return this._http.get('http://localhost:8080/user', {withCredentials: true});
    }

    public updateUserInfo(user: IUserRequestModel): Observable<any> {
        return this._http.put('http://localhost:8080/user', user, {withCredentials: true});
    }

    public updateUserPassword(password: IPasswordRequestModel): Observable<any> {
        return this._http.patch('http://localhost:8080/user/password', password, {withCredentials: true});
    }
}
