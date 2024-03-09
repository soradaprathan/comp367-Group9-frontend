/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@toys-hub/orders';
import { ProductsService } from '@toys-hub/products';
import { UsersService } from '@toys-hub/users';
import { combineLatest } from 'rxjs';

@Component({
    selector: 'admin-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    statistics = [];
    constructor(private userService: UsersService, private productService: ProductsService, private ordersService: OrdersService) {}

    ngOnInit(): void {
        combineLatest([
            this.ordersService.getOrdersCount(),
            this.productService.getProductsCount(),
            this.userService.getUsersCount(),
            this.ordersService.getTotalSales()
        ]).subscribe((values) => {
            this.statistics = values;
        });
    }
}
