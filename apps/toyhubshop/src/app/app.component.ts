import { Component, OnInit } from '@angular/core';
import { UsersService } from '@toys-hub/users';

@Component({
    selector: 'toys-hub-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    title = 'toyhubshop';

    constructor(private usersService: UsersService) {}

    ngOnInit() {
        this.usersService.initAppSession();
    }
}
