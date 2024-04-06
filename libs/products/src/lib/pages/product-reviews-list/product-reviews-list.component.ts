import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  currentProductId: string;
  endSubs$: Subject<any> = new Subject();
  avgRating = 0;

  constructor(private prodService: ProductsService, 
                private reviewService: ReviewsService, 
                private route: ActivatedRoute,
                private router: Router) { }

  ngOnInit(): void {
    // this._getReviews();
    this.route.params.subscribe((params) => {
      if (params.productid) {
        this.currentProductId = params.productid;
        this._getProduct(this.currentProductId);
        this._getReviews(this.currentProductId);
        this._getReviewsAverage(this.currentProductId);
        // if(this.lstReviews.length > 0){
          
        // }
      }
    });
  }

  ngOnDestroy(): void {
      this.endSubs$.next();
      this.endSubs$.complete();
  }

  private _getReviewsAverage(productid: string) {
    try{
      this.reviewService
      .getReviewsAverage(productid)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((avg: number) => {
        this.avgRating = avg['averageRating'];
        // console.log(this.avgRating);
      });
    }catch(error){
      console.log("Error getting average rating: ", error);
    }
    
  }

  private _getProduct(id: string) {
    this.prodService
        .getProduct(id)
        .pipe(takeUntil(this.endSubs$))
        .subscribe((resProduct) => {
            this.product = resProduct;
            console.log(this.product);
        });
    //this.product.rating = this.avgRating;
}

  private _getReviews(productid?: string) {

    console.log("Getting reviews for product id: ", this.currentProductId);
    this.reviewService
      .getReviews(productid)
      .pipe(takeUntil(this.endSubs$))
      .subscribe(reviews => {
        console.log(reviews);
        this.lstReviews = reviews;
      });
  }

  navigateToAddReview(){
    console.log("Naviganting to write review page");
    this.router.navigate(['/products', this.product.id, 'write-review']);
  }

  navigateToProduct(){
    this.router.navigate(['/products', this.product.id]);
  }

}
