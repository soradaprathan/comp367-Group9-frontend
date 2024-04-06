import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from '../../models/product';
import { Review } from '../../models/review';
import { ProductsService } from '../../services/products.service';
import { CartItem, CartService } from '@toys-hub/orders';
import { ReviewsService } from '../../services/reviews.service';

@Component({
    selector: 'products-product-page',
    templateUrl: './product-page.component.html',
    styles: []
})
export class ProductPageComponent implements OnInit, OnDestroy {
    product: Product;
    endSubs$: Subject<any> = new Subject();
    quantity = 1;
    avgRating = 0;

    constructor(private prodService: ProductsService, private route: ActivatedRoute, private cartService: CartService, private reviewService: ReviewsService) { }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params.productid) {
                this._getReviewsAverage(params.productid);
                this._getProduct(params.productid);

            }
        });
    }

    ngOnDestroy(): void {
        this.endSubs$.next();
        this.endSubs$.complete();
    }

    addProductToCart() {
        const cartItem: CartItem = {
            productId: this.product.id,
            quantity: this.quantity
        };

        this.cartService.setCartItem(cartItem);
    }

    private _getProduct(id: string) {
        this.prodService
            .getProduct(id)
            .pipe(takeUntil(this.endSubs$))
            .subscribe((resProduct) => {
                this.product = resProduct;
                //console.log(this.product);
            });
    }

    private _getReviewsAverage(productid: string) {
        this.reviewService
            .getReviewsAverage(productid)
            .pipe(takeUntil(this.endSubs$))
            .subscribe((avg: number) => {
                this.avgRating = avg['averageRating'];
                console.log(this.avgRating);
            });
        //this.product.rating = this.avgRating;
    }
}
