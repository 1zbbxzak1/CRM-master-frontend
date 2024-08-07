import {ErrorHandler, inject} from "@angular/core";
import {UserService} from "./user.service";
import {IUserResponseModel} from "../../response-models/user/IUser.response-model";
import {catchError, map, NEVER, Observable} from "rxjs";
import {IUserRequestModel} from "../../request-models/user/IUser.request-model";
import {IPasswordRequestModel} from "../../request-models/user/IPassword.request-model";

export class UserManagerService {
    private readonly _userService: UserService = inject(UserService);
    private readonly _errorHandler: ErrorHandler = inject(ErrorHandler);

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

    public updateUserInfo(user: IUserRequestModel): Observable<boolean> {
        return this._userService.updateUserInfo(user).pipe(
            map((): boolean => true),
            catchError(err => {
                this._errorHandler.handleError(err);
                return NEVER;
            })
        )
    }

    public updateUserPassword(password: IPasswordRequestModel): Observable<boolean> {
        return this._userService.updateUserPassword(password).pipe(
            map((): boolean => true),
            catchError(err => {
                this._errorHandler.handleError(err);
                return NEVER;
            })
        )
    }
}
