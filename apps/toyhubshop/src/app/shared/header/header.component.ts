import { Component, OnInit } from '@angular/core';
import { UsersService } from '@toys-hub/users';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'toyshop-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    constructor(private usersService: UsersService) {}

    userId: string;
    unsubscribe$: Subject<any> = new Subject();

    ngOnInit(): void {
        this._getCurrentUser();
    }

    private _getCurrentUser() {
      try {
        // this.usersService
        //   .observeCurrentUser()
        //   .pipe(takeUntil(this.unsubscribe$))
        //   .subscribe((user) => {
        //     if (user) {
        //       this.userId = user.id;
        //       console.log(this.userId);
        //     }
        //   });
        console.log('Current user id: ', this.userId);
      }
      catch (error) {
        console.error(error);
      }
    }
}
