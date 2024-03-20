import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../../models/review';

@Component({
  selector: 'products-review-item',
  templateUrl: './review-item.component.html',
  styles: [
  ]
})
export class ReviewItemComponent implements OnInit {

  @Input() review: Review;

  constructor() { }

  ngOnInit(): void {
  }

}
