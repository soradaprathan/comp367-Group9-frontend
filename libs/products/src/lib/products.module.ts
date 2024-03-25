import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { OrdersModule } from '@toys-hub/orders';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RatingModule } from 'primeng/rating';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { UiModule } from '@toys-hub/ui';
import { ProductReviewsListComponent } from './pages/product-reviews-list/product-reviews-list.component';
import { ReviewItemComponent } from './components/review-item/review-item.component';
import { ProductReviewPageComponent } from './pages/product-review-page/product-review-page.component';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';

const routes: Routes = [
    {
        path: 'products',
        component: ProductsListComponent
    },
    {
        path: 'category/:categoryid',
        component: ProductsListComponent
    },
    {
        path: 'products/:productid',
        component: ProductPageComponent
    },
    {
        path: 'products/:productid/reviews',
        component: ProductReviewsListComponent
    },
    {
        path: 'products/:productid/write-review',
        component: ProductReviewPageComponent
    
    },
    {
        path: 'products/:productid/write-review/:reviewid',
        component: ProductReviewPageComponent
    
    }
];
@NgModule({
    imports: [CommonModule, OrdersModule, RouterModule.forChild(routes), ToastModule, CardModule, InputTextareaModule, ButtonModule, ToolbarModule, CheckboxModule, FormsModule, ReactiveFormsModule, RatingModule, InputNumberModule, UiModule],
    declarations: [
        ProductsSearchComponent,
        CategoriesBannerComponent,
        ProductItemComponent,
        FeaturedProductsComponent,
        ProductsListComponent,
        ProductPageComponent,
        ProductReviewsListComponent,
        ReviewItemComponent,
        ProductReviewPageComponent
    ],
    exports: [ProductsSearchComponent, CategoriesBannerComponent, ProductItemComponent, FeaturedProductsComponent, ProductsListComponent, ProductPageComponent, ProductReviewsListComponent, ReviewItemComponent, ProductReviewPageComponent]
})
export class ProductsModule {}
