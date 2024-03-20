import { Product } from './product';

export class Review {
    id?: string;
    product?: Product;
    user?: any;
    comment?: string;
    rating?: number;
    order?: any;
    dateReview?: Date;
}
