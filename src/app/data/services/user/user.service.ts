import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUserRequestModel} from "../../request-models/user/IUser.request-model";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    public getUserInfo(): Observable<any> {
        return this.http.get('http://localhost:8080/user', {withCredentials: true});
    }

    public updateUserInfo(user: IUserRequestModel): Observable<any> {
        return this.http.put('http://localhost:8080/user', user, {withCredentials: true});
    }
}
