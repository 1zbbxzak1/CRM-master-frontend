import {IAuthDataRequestModel} from "./IAuthData.request-model";

export interface IRegistrationRequestModel extends IAuthDataRequestModel {
    readonly fullName: string,
    readonly phone: string,
    readonly vkLink: string,
    readonly telegramLink: string,
}
