import {inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUserRequestModel} from "../../request-models/user/IUser.request-model";
import {IPasswordRequestModel} from "../../request-models/user/IPassword.request-model";
import {environment} from "../../../../environments/environment";

export class UserService {

    private readonly _http: HttpClient = inject(HttpClient);
    private readonly _apiUrl: string = `${environment.apiUrl}/user`;

    public getUserInfo(): Observable<any> {
        return this._http.get(this._apiUrl, {withCredentials: true});
    }

    public updateUserInfo(user: IUserRequestModel): Observable<any> {
        return this._http.put(this._apiUrl, user, {withCredentials: true});
    }

    public updateUserPassword(password: IPasswordRequestModel): Observable<any> {
        return this._http.patch(`${this._apiUrl}/password`, password, {withCredentials: true});
    }
}
