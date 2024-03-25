import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../../models/review';
import { Router } from '@angular/router';

@Component({
  selector: 'products-review-item',
  templateUrl: './review-item.component.html',
  styles: [
  ]
})
export class ReviewItemComponent implements OnInit {

  @Input() review: Review;

  constructor(private router: Router) { }

  currentUser = '65cb99e758f3d520a8cc39e6';

  ngOnInit(): void {
  }

  navigateToEditReview(productId: string, reviewId: string){
    console.log("Naviganting to edit review.");
    this.router.navigate(['/products', productId, 'write-review', reviewId]);
  }

}
