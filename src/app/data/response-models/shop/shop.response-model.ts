// models.ts

export interface GlobalStylesDto {
    fontFamily: string;
    backgroundColor: string;
    h1Color: string;
    pColor: string;
    buttonColor: string;
}

export interface ChangeGlobalStylesRequest {
    fontFamily?: string;
    backgroundColor?: string;
    h1Color?: string;
    pColor?: string;
    buttonColor?: string;
}

export interface BlockDto {
    id: string;
    blockType: string;
    title?: string;
    order: number;
    properties: BlockPropertiesDto;
}

export interface BlockPropertiesDto {
    text?: string;
    type?: number;
    h1Text?: string;
    pText?: string;
    imageUrl?: string;
    textSections?: TextSectionDto[];
}

export interface TextSectionDto {
    title: string;
    text: string;
}

export interface TemplateDto {
    id: number;
    globalStyles: GlobalStylesDto;
    blocks: BlockDto[];
}

export interface WebsiteDto {
    id: string;
    title: string;
    addressName: string;
    url: string | null,
    templateId?: number;
}

export interface ChangeWebsiteInfoRequest {
    title?: string;
    addressName?: string;
}

export interface CreateWebsiteRequest {
    title: string;
    addressName: string;
}

export interface SelectTemplateRequest {
    templateId: number | null;
}

export interface OrderClientDto {
    fullName: string;
    email: string;
    phone: string;
}

export interface OrderProductRequest {
    productId: string;
    quantity: number;
}

export interface CreateWebsiteOrderRequest {
    client: OrderClientDto;
    comment: string;
    address: string;
    products: OrderProductRequest[];
}

export interface ChangeBlockRequest {
    text: string | null;
    type: number | null;
    h1Text: string | null;
    pText: string | null;
    imageUrl: string | null;
    textSections?: TextSectionDto[] | null;
}
