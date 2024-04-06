import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@toys-hub/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'admin-products-list',
    templateUrl: './products-list.component.html',
    styles: []
})
export class ProductsListComponent implements OnInit {
    products = [];
    globalFilterValue = '';
    endsubs$: Subject<any> = new Subject();

    @ViewChild('dt') table: Table;

    constructor(
        private productsService: ProductsService,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
    ngOnInit(): void {
        this._getProducts();
    }

    ngOnDestroy() {
        this.endsubs$.next();
        this.endsubs$.complete();
    }

    applyFilter() {
        this.table.filterGlobal(this.globalFilterValue, 'contains');
    }

    private _getProducts() {
        this.productsService
            .getProducts()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((products) => {
                this.products = products;
            });
    }

    updateProduct(productid: string) {
        this.router.navigateByUrl(`products/form/${productid}`);
    }

    deleteProduct(productId: string) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this Product?',
            header: 'Delete Product',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.productsService
                    .deleteProduct(productId)
                    .pipe(takeUntil(this.endsubs$))
                    .subscribe(
                        () => {
                            this._getProducts();
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: 'Product is deleted!'
                            });
                        },
                        () => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Product is not deleted!'
                            });
                        }
                    );
            }
        });
    }
}
