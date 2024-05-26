import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {IProductsRequestModel} from "../../../../../../data/request-models/products/IProducts.request-model";
import {IProductsResponseModel} from "../../../../../../data/response-models/products/IProducts.response-model";
import {ProductsManagerService} from "../../../../../../data/services/products/products.manager.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['../../../../styles/crm-styles.css', './styles/add-product.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProductComponent {
    protected material: null = null;
    protected open: boolean = false;
    protected isDragging: boolean = false;
    protected selectedFiles: { file: File, image: string }[] = [];

    protected readonly materials: string[] = [
        'Дерево',
        'Керамика',
        'Кожа',
        'Ткань',
        'Металл',
        'Стекло',
        'Резина',
        'Бумага',
        'Камень',
    ];
    protected formProductInfo: FormGroup = new FormGroup({
        name: new FormControl(''),
        price: new FormControl(0),
        material: new FormControl(''),
        dimensions: new FormControl(''),
        description: new FormControl(''),
    });
    private dragIndex: number = -1;

    constructor(
        private readonly _router: Router,
        protected readonly _destroyRef: DestroyRef,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        protected readonly _productManagerService: ProductsManagerService,
    ) {
    }

    onDragStart(event: DragEvent, index: number): void {
        this.dragIndex = index;
        event.dataTransfer?.setData('text', '');
        this.isDragging = true;
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

    protected addProduct(): void {
        const name: string = this.formProductInfo.get('name')?.value;
        const price: number = this.formProductInfo.get('price')?.value;
        const material: string = this.formProductInfo.get('material')?.value;
        const dimensions: string = this.formProductInfo.get('dimensions')?.value;
        const description: string = this.formProductInfo.get('description')?.value;

        if (name && price && material && dimensions && description) {
            const product: IProductsRequestModel = {
                name,
                price,
                material,
                dimensions,
                description,
            };

            const files: File[] = this.selectedFiles.map(f => f.file);

            this._productManagerService.addProduct(product, files).pipe(
                takeUntilDestroyed(this._destroyRef)
            ).subscribe({
                next: (response: IProductsResponseModel): void => {
                    console.log('Product created successfully:', response);
                    this.navigateToPreviousPage();
                },
                error: (error) => console.error('Error creating product:', error)
            });
        } else {
            console.error('Not all fields are filled in correctly');
        }
    }

    protected navigateToPreviousPage(): void {
        this._router.navigate(['crm/products']);
    }

    protected deletePhoto(index: number): void {
        this.selectedFiles.splice(index, 1);
        this._changeDetectorRef.detectChanges();
    }

    private movePhoto(fromIndex: number, toIndex: number): void {
        if (fromIndex === toIndex) {
            return;
        }
        const movedPhoto = this.selectedFiles[fromIndex];
        this.selectedFiles.splice(fromIndex, 1);
        this.selectedFiles.splice(toIndex, 0, movedPhoto);
        this._changeDetectorRef.detectChanges();
    }

    private readFile(file: File): Promise<void> {
        return new Promise((resolve, reject): void => {
            const reader: FileReader = new FileReader();
            reader.onload = (e: any): void => {
                this.selectedFiles.push({file, image: e.target.result});
                resolve();
            };
            reader.onerror = (): void => {
                console.error('Error reading file:', file.name);
                reject();
            };
            reader.readAsDataURL(file);
        });
    }
}
