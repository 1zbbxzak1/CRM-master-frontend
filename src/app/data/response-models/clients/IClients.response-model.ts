import {GetOrderItemResponse} from "../../request-models/orders/IOrders.response-model";

export interface IClientsResponseModel {
    count: number;
    clients: ClientItemResponse[];
}

export interface ClientItemResponse {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    lastOrderDate: string;
}

export interface ClientDto {
    id: string;
    initials: string;
    fullName: string;
    email: string;
    phone: string;
    lastOrderDate: Date;
    orders: GetOrderItemResponse[];
}
