import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    ElementRef,
    inject,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import {Observable, Subject, Subscription, switchMap} from "rxjs";
import {CartService} from "../../../services/cart.service";
import {ProductCountService} from "../../../services/product-count.service";
import {
    BlockDto,
    ChangeBlockRequest,
    TextSectionDto,
    WebsiteDto
} from "../../../../../../../../data/response-models/shop/shop.response-model";
import {IProductsResponseModel} from "../../../../../../../../data/response-models/products/IProducts.response-model";
import {IUserResponseModel} from "../../../../../../../../data/response-models/user/IUser.response-model";
import {Router} from "@angular/router";
import {ShopService} from "../../../../../../../../data/services/shop/shop.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";


@Component({
    selector: 'app-template-constructor',
    templateUrl: './constructor-main.component.html',
    styleUrls: ['./styles/constructor-main.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConstructorMainComponent implements OnInit, OnDestroy {
    countProduct = 0;
    loading: boolean = true;
    selectedItem: string = "Главная";
    pagesList = ['Page 1', 'Page 2', 'Page 3'];
    @ViewChild('h1Text')
    protected h1V!: ElementRef;
    @ViewChild('pText')
    protected pT!: ElementRef;
    @ViewChild('Title')
    protected title!: ElementRef;
    @ViewChild('Text')
    protected text!: ElementRef;
    protected countProductSubscription!: Subscription;
    protected textSections: TextSectionDto[] = [];
    protected uploadedImageUrl: string = '';
    protected products: IProductsResponseModel[] = [];
    protected pageUrls: Record<string, string> = {};
    protected search: string = '';
    protected isSortedAsc: boolean = true;
    protected blocks: BlockDto[] = [];
    protected user!: Observable<IUserResponseModel>;
    protected website!: WebsiteDto;
    private cartService: CartService = inject(CartService);
    private productCountService: ProductCountService = inject(ProductCountService);
    private destroy$ = new Subject<void>();

    constructor(
        protected readonly _destroyRef: DestroyRef,
        protected readonly _changeDetectorRef: ChangeDetectorRef,
        protected readonly _router: Router,
        protected readonly _shopService: ShopService,
    ) {
        setTimeout(() => {
            this.loading = false;
        }, 500);

        const hasTemplateSelected = localStorage.getItem('templateSelected');
        if (!hasTemplateSelected) {
            this._shopService.selectTemplate({templateId: 1}).pipe(
                takeUntilDestroyed(this._destroyRef)
            ).subscribe({
                next: () => {
                    localStorage.setItem('templateSelected', 'true');
                    this.loadMainSection();
                },
                error: (error) => {
                    console.error('Error selecting template', error);
                }
            });
        } else {
            this.loadMainSection();
        }
    }

    onPageChange(selectedItem: string): void {
        const url = this.pageUrls[selectedItem];
        if (url) {
            this._router.navigate([url]);
        }
    }

    ngOnDestroy(): void {
        this.countProductSubscription.unsubscribe();
        this.destroy$.next();
        this.destroy$.complete();
    }

    ngOnInit(): void {
        this.countProduct = this.productCountService.getCountProduct();
        this.countProductSubscription = this.productCountService.countProductChanged.subscribe((count: number) => {
            this.countProduct = count;
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
                console.log('Block updated successfully', response);
                this._changeDetectorRef.markForCheck(); // Notify Angular of data changes
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

    protected navigateToCartPage(): void {
        this._router.navigate(['crm/shop/shop-templates/templates-preview/constructor/cart']);
    }

    protected handleFileInput(event: any, blockId: string): void {
        const file = event.target.files[0];

        if (file) {
            const newFile: File = new File([file], "main-block-image", {type: file.type});
            const reader: FileReader = new FileReader();
            reader.onload = (): void => {
                this.uploadedImageUrl = reader.result as string;
                this.updateBlockProperty(blockId, 'imageUrl', this.uploadedImageUrl);
                this._changeDetectorRef.detectChanges(); // Force change detection
            };
            reader.readAsDataURL(newFile);
        }
    }

    protected updateTextProperty(elementRef: ElementRef, property: string, blockId: string): void {
        const element = elementRef.nativeElement;
        if (element) {
            const range: Range | undefined = window.getSelection()?.getRangeAt(0);
            const start: number = range?.startOffset || 0;

            const newText = element.textContent.trim();
            this.updateBlockProperty(blockId, property, newText);

            this._changeDetectorRef.detectChanges(); // Force change detection
            element.focus();
            this.setCaretPosition(element, start);
        } else {
            console.error(`Element with id '${elementRef.nativeElement.id}' not found or not accessible.`);
        }
    }

    protected updateBlockProperty(blockId: string, property: string, value: any): void {
        const block: BlockDto = this.blocks.find((b: BlockDto): boolean => b.id === blockId)!;
        if (block) {
            (block.properties as any)[property] = value;
            this.saveBlock(block);
            this._changeDetectorRef.markForCheck(); // Notify Angular of data changes
        }
    }

    private loadMainSection(): void {
        this._shopService.getMainSection().pipe(
            takeUntilDestroyed(this._destroyRef)
        ).subscribe({
            next: (blocks: BlockDto[]): void => {
                this.blocks = blocks;
                this._changeDetectorRef.detectChanges();

                const block: BlockDto = this.blocks.find((b: BlockDto): boolean => b.id === blocks[3].id!)!;
                if (block) {
                    this.textSections = block.properties.textSections!;
                }
            },
            error: (error) => {
                console.error('Error loading main section', error);
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

            this.pageUrls = {
                'Главная': 'crm/shop/shop-templates/templates-preview/constructor/main',
                'Товар': `crm/shop/shop-templates/templates-preview/constructor/card${this.products?.[0].id}`,
                'Корзина': 'crm/shop/shop-templates/templates-preview/constructor/cart'
            };
            this.sortProducts();
            this._changeDetectorRef.detectChanges();
        });
    }

}
