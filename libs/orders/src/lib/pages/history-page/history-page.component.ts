import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../models/order';
import { UsersService } from '@toys-hub/users';

@Component({
  selector: 'orders-history-page',
  templateUrl: './history-page.component.html',
  styles: [
  ]
})
export class HistoryPageComponent implements OnInit, OnDestroy  {

  constructor(private orderService: OrdersService,
    private route: ActivatedRoute,
    private router:Router,
    private usersService: UsersService,) { }

  lstOrders: Order[] = [];
  unsubscribe$: Subject<any> = new Subject();
  userId: string;

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    
    // force to complete the execution of _getCurrentUser() first, then execute _getOrders()
    this._getCurrentUser();
    //wait for the userId to be set
    setTimeout(() => {
      console.log("USERID: " + this.userId);
      this._getOrders();
    }, 100);
    // this._getOrders();


    
  }

  private _getCurrentUser() {
    this.usersService
      .observeCurrentUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        if (user) {
          this.userId = user.id;
          console.log(this.userId);
        }
      });
  }

  private _getOrders() {
    
    this.orderService.getOrdersByUserId(this.userId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((orders: Order[]) => {
          console.log(orders);
          this.lstOrders = orders;
        });
  }

}
