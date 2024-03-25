import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';
import { Review } from '../models/review';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class ReviewsService {
    apiURLReviews = environment.apiUrl + 'reviews';

    constructor(private http: HttpClient) {}

    getReviews(productFilter?: string): Observable<Review[]> {
        let params = new HttpParams();
        if (productFilter) {
            params = params.append('product', productFilter);
        }
        return this.http.get<Review[]>(this.apiURLReviews, { params: params });
    }

    createReview(review: Review): Observable<Review> {
        return this.http.post<Review>(this.apiURLReviews, review);
    }

    getReview(reviewId: string): Observable<Review> {
        return this.http.get<Review>(`${this.apiURLReviews}/${reviewId}`);
    }

    updateReview(review: Review, reviewId: string): Observable<Review> {
        return this.http.put<Review>(`${this.apiURLReviews}/${reviewId}`, review);
    }

    deleteReview(reviewId: string): Observable<any> {
        return this.http.delete<any>(`${this.apiURLReviews}/${reviewId}`);
    }
    getReviewsAverage(productFilter?: string): Observable<number> {
        return this.http.get<number>(`${this.apiURLReviews}/get/averagebyproductid/${productFilter}`); 
    }
    
}
