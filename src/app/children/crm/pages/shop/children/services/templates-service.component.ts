import {ChangeDetectorRef, DestroyRef, Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {IProductsResponseModel} from "../../../../../../data/response-models/products/IProducts.response-model";
import {
    BlockDto,
    ChangeBlockRequest,
    TextSectionDto,
    WebsiteDto
} from "../../../../../../data/response-models/shop/shop.response-model";
import {ShopService} from "../../../../../../data/services/shop/shop.service";
import {delay, Observable, switchMap} from "rxjs";
import {IUserResponseModel} from "../../../../../../data/response-models/user/IUser.response-model";

@Injectable()
export class TemplatesServiceComponent {
    loading: boolean = true;
    protected textSections: TextSectionDto[] = [];
    protected uploadedImageUrl: string = '';
    protected products: IProductsResponseModel[] = [];
    protected search: string = '';
    protected isSortedAsc: boolean = true;
    protected blocks: BlockDto[] = [];
    protected user!: Observable<IUserResponseModel>;
    protected website!: WebsiteDto;

    constructor(
        protected readonly _destroyRef: DestroyRef,
        protected readonly _changeDetectorRef: ChangeDetectorRef,
        protected readonly _router: Router,
        protected readonly _shopService: ShopService,
    ) {
        setTimeout(() => {
            this.loading = false;
        }, 500);

        this._shopService.selectTemplate({templateId: 1}).pipe(
            takeUntilDestroyed(this._destroyRef),
            switchMap(() => this._shopService.getMainSection().pipe(delay(300)))
        ).subscribe({
            next: (blocks: BlockDto[]): void => {
                this.blocks = blocks;

                this._changeDetectorRef.detectChanges();

                const block: BlockDto = this.blocks.find((b: BlockDto): boolean => b.id === blocks[3].id!)!;
                if (block) {
                    this.textSections = block.properties.textSections!;
                }
            }
        });

        this._shopService.getWebsiteInfo().pipe(
            takeUntilDestroyed(this._destroyRef),
            switchMap((web: WebsiteDto): Observable<IProductsResponseModel[]> => {
                this.website = web;
                this.user = this._shopService.getMasterInfo(this.website?.addressName);
                return this._shopService.getVisibleProducts(this.website.addressName);
            })
        ).subscribe((products: IProductsResponseModel[]): void => {
            this.products = products;
            this.sortProducts();
            this._changeDetectorRef.detectChanges();
        });
    }

    protected searchProducts(): IProductsResponseModel[] {
        return this.products.filter((product: IProductsResponseModel) => product.name.toLowerCase().includes(this.search.toLowerCase()));
    }

    protected sortProducts(): void {
        this.products.sort((a: IProductsResponseModel, b: IProductsResponseModel): number => this.isSortedAsc ? a.price - b.price : b.price - a.price);
    }

    protected toggleSort(): void {
        this.isSortedAsc = !this.isSortedAsc;
        this.sortProducts();
    }

    protected saveBlock(block: BlockDto): void {
        const request: ChangeBlockRequest = {
            text: block.properties.text || null,
            type: block.properties.type || null,
            h1Text: block.properties.h1Text || null,
            pText: block.properties.pText || null,
            imageUrl: block.properties.imageUrl || null,
            textSections: block.properties.textSections || null
        };
        this._shopService.changeBlock(block.id, request).subscribe({
            next: (response: BlockDto): void => {
                this._changeDetectorRef.detectChanges();
                console.log('Block updated successfully', response);
            },
            error: (error): void => {
                console.error('Error updating block', error);
            }
        });
    }

    protected getBlockPropertyValue(blockId: string, property: string): never {
        const block: BlockDto = this.blocks.find((b: BlockDto): boolean => b.id === blockId)!;

        return (block?.properties as never)?.[property];
    }

    protected getBlockImageUrl(blockId: string): string | undefined {
        const block: BlockDto = this.blocks.find((b: BlockDto): boolean => b.id === blockId)!;

        return block?.properties?.imageUrl;
    }

    protected setCaretPosition(el: HTMLElement, pos: number): void {
        const range: Range = document.createRange();
        const sel: Selection = window.getSelection()!;
        if (el.childNodes.length > 0) {
            range.setStart(el.childNodes[0], pos);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
}
