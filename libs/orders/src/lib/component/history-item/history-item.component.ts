import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../models/order';

@Component({
  selector: 'orders-history-item',
  templateUrl: './history-item.component.html',
  styles: [
  ]
})
export class HistoryItemComponent implements OnInit {

  @Input() order: Order;
  countItems: number = 0;
  countProducts: number = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this._countItems(this.order);
    this._countProducts(this.order);
  }

  private _countItems(order: Order): void {
    this.countItems = order.orderItems.reduce((acc, item) => acc + item.quantity, 0);
    console.log("Count items: " + this.countItems);
  }

  private _countProducts(order: Order): void {
    this.countProducts = order.orderItems.length;
    console.log("Count products: " + this.countProducts);
  }

  private _navigateToOrderDetails(orderId: string): void {
    this.router.navigate(['/orders', 'order-details', orderId]);
  }

}
