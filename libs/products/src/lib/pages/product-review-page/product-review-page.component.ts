import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewsService } from '../../services/reviews.service';
import { ProductsService } from '../../services/products.service';
import { Review } from '../../models/review';
import { Product } from '../../models/product';
import { takeUntil } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { UsersService } from '@toys-hub/users';

@Component({
  selector: 'products-review-page',
  templateUrl: './product-review-page.component.html'
})
export class ProductReviewPageComponent implements OnInit {
  constructor(private prodService: ProductsService,
    private reviewService: ReviewsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router) {

  }
  review: Review;
  product: Product;
  reviewFormGroup: FormGroup;
  endSubs$: Subject<any> = new Subject();
  isSubmitted = false;
  rating: 0;
  editmode = false;
  currentReviewId: string;
  userId: string;

  ngOnInit(): void {

    this._getCurrentUser();
    //wait for the userId to be set
    setTimeout(() => {
      console.log("USERID: " + this.userId);
      this._initReviewForm();
      this.route.params.subscribe((params) => {
        if (params.productid) {
          this._getProduct(params.productid);
        }
        if (params.reviewid) {
          this.currentReviewId = params.reviewid;
        }
      });
      this._checkEditMode();
    }, 100);

  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  private _initReviewForm() {
    this.reviewFormGroup = this.formBuilder.group({
      rating: ['', Validators.required],
      comment: ['', Validators.required],
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
  }

  navigateToReviews() {
    this.router.navigate(['/products', this.product.id, 'reviews']);
  }

  saveReview() {
    console.log("Clicked on Save Review Button");
    this.isSubmitted = true;
    if (this.reviewFormGroup.invalid) {
      console.log("Review form is invalid");
      return;
    }

    const reviewForm: Review = {
      rating: this.reviewForm.rating.value,
      comment: this.reviewForm.comment.value,
      user: this.userId,
      product: this.product.id,
    }

    if (this.editmode) {
      this.reviewService
        .updateReview(reviewForm, this.currentReviewId)
        .pipe(takeUntil(this.endSubs$))
        .subscribe(() => {
          this.navigateToReviews();
          console.log("Review updated successfully");

        },
          () => {
            //display some message to user
            console.log("Update review Failed");
          }
        );
    } else {

      this.reviewService
        .createReview(reviewForm)
        //.pipe(takeUntil(this.endSubs$))
        .subscribe(
          () => {
            this.navigateToReviews();
            console.log("Review saved successfully");

          },
          () => {
            //display some message to user
            console.log("Review Failed");
          }
        );
    }

  }

  get reviewForm() {
    return this.reviewFormGroup.controls;
  }

  private _checkEditMode() {
    console.log("Checking Edit Mode");
    this.route.params.pipe(takeUntil(this.endSubs$)).subscribe((params) => {
      if (this.currentReviewId) {
        this.editmode = true;
        console.log("Edit Mode is true");
        //this.currentReviewId = params.id;
        this.reviewService
          .getReview(this.currentReviewId)
          .pipe(takeUntil(this.endSubs$))
          .subscribe((review) => {
            console.log(review);
            this.reviewFormGroup = this.formBuilder.group({
              rating: [review.rating, Validators.required],
              comment: [review.comment, Validators.required],
            });
          });

      }
    });
  }

  private _getCurrentUser() {
    this.usersService
      .observeCurrentUser()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((user) => {
        if (user) {
          this.userId = user.id;
          console.log(this.userId);
        }
      });
  }


}
