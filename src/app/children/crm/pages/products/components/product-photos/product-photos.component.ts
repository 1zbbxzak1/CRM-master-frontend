import {ChangeDetectorRef, Component, DestroyRef} from '@angular/core';
import {IProductsResponseModel} from "../../../../../../data/response-models/products/IProducts.response-model";
import {ActivatedRoute, Params} from "@angular/router";
import {ProductsManagerService} from "../../../../../../data/services/products/products.manager.service";
import {ProductPhotoManagerService} from "../../../../../../data/services/product-photo/product-photo.manager.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {
    IProductPhotoResponseModel
} from "../../../../../../data/response-models/product-photo/IProductPhoto.response-model";
import {switchMap} from "rxjs";

@Component({
    selector: 'app-product-photos',
    templateUrl: './product-photos.component.html',
    styleUrl: './styles/product-photos.component.css'
})
export class ProductPhotosComponent {
    protected productId!: string;
    protected product!: IProductsResponseModel;
    protected selectedFiles: { file: File, image: string }[] = [];
    protected isDragging: boolean = false;
    private dragIndex: number = -1;

    constructor(
        private readonly _route: ActivatedRoute,
        protected readonly _destroyRef: DestroyRef,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        protected readonly _productManagerService: ProductsManagerService,
        private readonly _productPhotoManagerService: ProductPhotoManagerService,
    ) {
        this._route.params.subscribe((params: Params): void => {
            this.productId = params['id'];

            this._productManagerService.getProduct(this.productId).pipe(
                takeUntilDestroyed(this._destroyRef)
            ).subscribe((products: IProductsResponseModel): void => {
                this.product = products;
                
                this._changeDetectorRef.detectChanges();
            });
        });
    }

    onDragStart(event: DragEvent, index: number): void {
        this.dragIndex = index;
        this.isDragging = true;
        event.dataTransfer?.setData('text', '');
        this._changeDetectorRef.detectChanges();
    }

    onDragEnter(event: DragEvent): void {
        event.preventDefault();
        this._changeDetectorRef.detectChanges();
    }

    onDragDrop(event: DragEvent, index: number): void {
        event.preventDefault();
        this.movePhoto(this.dragIndex, index);
        this.isDragging = false;
        this._changeDetectorRef.detectChanges();
    }

    protected async onFileSelected(event: any): Promise<void> {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            await this.readFile(files[i]);
        }
        this._changeDetectorRef.detectChanges();
    }

    protected async onDrop(event: DragEvent): Promise<void> {
        event.preventDefault();
        event.stopPropagation();
        const dropArea: HTMLElement = event.currentTarget as HTMLElement;
        dropArea.style.backgroundColor = 'none';

        const files: FileList | undefined = event.dataTransfer?.files;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                await this.readFile(files[i]);
            }
        }
        this._changeDetectorRef.detectChanges();
    }

    protected onDragOver(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        const dropArea: HTMLElement = event.currentTarget as HTMLElement;
        dropArea.style.backgroundColor = 'none';

        this._changeDetectorRef.detectChanges();
    }

    protected onDragLeave(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        const dropArea: HTMLElement = event.currentTarget as HTMLElement;
        dropArea.style.backgroundColor = 'none';

        this._changeDetectorRef.detectChanges();
    }

    protected deleteProductPhoto(productId: string, photoId: string): void {
        this._productPhotoManagerService.deleteProductPhoto(productId, photoId)
            .pipe(
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe({
                next: (): void => {
                    this.product.photos = this.product.photos.filter((photo: IProductPhotoResponseModel): boolean => photo.id !== photoId);
                    this._changeDetectorRef.detectChanges();
                }
            });
    }

    private movePhoto(fromIndex: number, toIndex: number): void {
        if (fromIndex === toIndex) {
            return;
        }
        const movedPhoto = this.product.photos[fromIndex];
        this.product.photos.splice(fromIndex, 1);
        this.product.photos.splice(toIndex, 0, movedPhoto);
        this.updatePhotoOrder();

        this._changeDetectorRef.detectChanges();
    }

    private updatePhotoOrder(): void {
        const updatedOrder = this.product.photos.map((photo, index) => {
            return {id: photo.id, order: index};
        });
        this._productPhotoManagerService.updateProductPhoto(this.productId, updatedOrder).subscribe({
                next: () => {
                    this._changeDetectorRef.detectChanges();
                }
            }
        );
    }

    private readFile(file: File): Promise<void> {
        return new Promise((resolve, reject): void => {
            const reader: FileReader = new FileReader();
            reader.onload = (e: any): void => {
                this.selectedFiles.push({file, image: e.target.result});
                this.addProductPhoto(this.productId);
                resolve();
            };
            reader.onerror = (): void => {
                reject();
            };
            reader.readAsDataURL(file);
        });
    }

    private addProductPhoto(productId: string): void {
        const files: File[] = this.selectedFiles.map(f => f.file);

        if (productId) {
            this._productPhotoManagerService.addProductPhoto(productId, files).pipe(
                takeUntilDestroyed(this._destroyRef),
                switchMap(() => {
                    return this._productManagerService.getProduct(productId);
                })
            ).subscribe({
                next: (product: IProductsResponseModel): void => {
                    this.product = product;
                    this.selectedFiles = [];
                    this._changeDetectorRef.detectChanges();
                }
            });
        }
    }
}
