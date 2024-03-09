import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
    selector: 'users-registration',
    templateUrl: './registration.component.html',
    styles: []
})
export class RegistrationComponent implements OnInit {
    registrationFormGroup: FormGroup;
    isSubmitted = false;
    authError = false;
    authMessage = 'Email or Password are wrong';

    constructor(private formBuilder: FormBuilder, private auth: AuthService, private localstorageService: LocalstorageService, private router: Router) {}

    ngOnInit(): void {
        this._initRegistrationForm();
    }

    private _initRegistrationForm() {
        this.registrationFormGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            name: ['', Validators.required],
            phone: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        this.isSubmitted = true;

        if (this.registrationFormGroup.invalid) return;

        this.auth
            .register(
                this.registrationForm.email.value,
                this.registrationForm.name.value,
                this.registrationForm.phone.value,
                this.registrationForm.password.value
            )
            .subscribe(
                (user) => {
                    console.log(user);
                    this.authError = false;
                    this.localstorageService.setToken(user.token);
                    this.router.navigate(['/']);
                },
                (error: HttpErrorResponse) => {
                    this.authError = true;
                    if (error.status !== 400) {
                        this.authMessage = 'Error in the Server, please try again later!';
                    }
                }
            );
    }

    get registrationForm() {
        return this.registrationFormGroup.controls;
    }
}
