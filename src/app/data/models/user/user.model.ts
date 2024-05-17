import {IUserResponseModel} from "../../response-models/user/IUser.response-model";
import {IUserRequestModel} from "../../request-models/user/IUser.request-model";

export class UserModel implements IUserResponseModel {
    readonly id: string;
    readonly email: string;
    readonly fullName: string;
    readonly phone: string;
    readonly telegramLink: string;
    readonly vkLink: string;

    constructor(user: IUserRequestModel, id: string) {
        this.id = id;
        this.fullName = user.fullName;
        this.email = user.email;
        this.phone = user.phone;
        this.vkLink = user.vkLink;
        this.telegramLink = user.telegramLink;
    }
}
