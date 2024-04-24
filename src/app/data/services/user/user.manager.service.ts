import {ErrorHandler, Injectable} from "@angular/core";
import {UserService} from "./user.service";
import {IUserResponseModel} from "../../response-models/user/IUser.response-model";
import {catchError, map, NEVER, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserManagerService {
    constructor(
        private _userService: UserService,
        private _errorHandler: ErrorHandler,
    ) {
    }

    public getUserInfo(): Observable<IUserResponseModel> {
        return this._userService.getUserInfo().pipe(
            map((userCredential: IUserResponseModel) => {
                    const userModel: IUserResponseModel = {
                        id: userCredential.id,
                        fullName: userCredential.fullName,
                        email: userCredential.email,
                        phone: userCredential.phone,
                        vkLink: userCredential.vkLink,
                        telegramLink: userCredential.telegramLink,
                    }

                    localStorage.setItem("id", userCredential.id);

                    return userModel;
                }
            ),
            catchError((err) => {
                this._errorHandler.handleError(err);
                return NEVER;
            })
        );
    }
}
