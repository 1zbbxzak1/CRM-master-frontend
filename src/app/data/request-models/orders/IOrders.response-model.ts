export interface GetOrderItemResponse {
    id: string;
    name: string;
    stage: string;
    totalAmount: number;
    comment: string;
    address: string;
    date: string;
    client: OrderClientDto;
}

export interface OrderClientDto {
    id: string;
    fullName: string;
    email: string;
    phone: string;
}
