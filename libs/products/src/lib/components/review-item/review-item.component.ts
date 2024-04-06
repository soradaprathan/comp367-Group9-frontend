import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../../models/review';
import { Router } from '@angular/router';
import { UsersService } from '@toys-hub/users';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'products-review-item',
  templateUrl: './review-item.component.html',
  styles: [
  ]
})
export class ReviewItemComponent implements OnInit {

  @Input() review: Review;

  constructor(private router: Router, 
    private usersService: UsersService) { }

  currentUser: string;
  unsubscribe$: Subject<any> = new Subject();

  ngOnInit(): void {
    // force to complete the execution of _getCurrentUser() first
    this._getCurrentUser();
    //wait for the userId to be set
    setTimeout(() => {
      console.log("USERID: " + this.currentUser);
    }, 100);
  }

  navigateToEditReview(productId: string, reviewId: string){
    console.log("Naviganting to edit review.");
    this.router.navigate(['/products', productId, 'write-review', reviewId]);
  }

  private _getCurrentUser() {
    this.usersService
      .observeCurrentUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        if (user) {
          this.currentUser = user.id;
          console.log(this.currentUser);
        }
      });
  }

}
