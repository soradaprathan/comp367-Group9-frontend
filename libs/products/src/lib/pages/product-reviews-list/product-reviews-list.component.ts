import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewsService } from '../../services/reviews.service';
import { ProductsService } from '../../services/products.service';
import { Review } from '../../models/review';
import { Product } from '../../models/product';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'reviews-list',
  templateUrl: './product-reviews-list.component.html',
  styles: [
  ]
})
export class ProductReviewsListComponent implements OnInit, OnDestroy {
  lstReviews: Review[] = [];
  product: Product;
  endSubs$: Subject<any> = new Subject();
  avgRating = 0;

  constructor(private prodService: ProductsService, private reviewService: ReviewsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._getReviews();
    this.route.params.subscribe((params) => {
      if (params.productid) {
        this._getReviewsAverage(params.productid);
        this._getProduct(params.productid);
        this._getReviews([params.productid]);
      }
    });
  }

  ngOnDestroy(): void {
      this.endSubs$.next();
      this.endSubs$.complete();
  }

  private _getReviewsAverage(productid: string) {
    this.reviewService
      .getReviewsAverage(productid)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((avg: number) => {
        this.avgRating = avg['averageRating'];
        // console.log(this.avgRating);
      });
  }

  private _getProduct(id: string) {
    this.prodService
        .getProduct(id)
        .pipe(takeUntil(this.endSubs$))
        .subscribe((resProduct) => {
            this.product = resProduct;
            // console.log(this.product);
        });
    this.product.rating = this.avgRating;
}

  private _getReviews(productid?: string[]) {

    this.reviewService
      .getReviews(productid)
      .pipe(takeUntil(this.endSubs$))
      .subscribe(reviews => {
        // console.log(reviews);
        this.lstReviews = reviews;
      });
  }

}
