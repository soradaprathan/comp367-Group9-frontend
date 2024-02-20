/* eslint-disable max-len */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { CategoriesFormsComponent } from './pages/categories/categories-forms/categories-forms.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { AuthGuard, JwtInterceptor, UsersModule } from '@toys-hub/users';

import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

import { ToastModule } from 'primeng/toast';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { EditorModule } from 'primeng/editor';
import { TagModule } from 'primeng/tag';
import { InputMaskModule } from 'primeng/inputmask';

const UX_MODULE = [
    CardModule,
    ToastModule,
    InputTextModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    ConfirmDialogModule,
    ColorPickerModule,
    InputNumberModule,
    DropdownModule,
    InputTextareaModule,
    InputSwitchModule,
    EditorModule,
    TagModule,
    InputMaskModule
];
const routes: Routes = [
    {
        path: '',
        component: ShellComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'products',
                component: ProductsListComponent
            },
            {
                path: 'products/form',
                component: ProductsFormComponent
            },
            {
                path: 'products/form/:id',
                component: ProductsFormComponent
            },
            {
                path: 'categories',
                component: CategoriesListComponent
            },
            {
                path: 'categories/form',
                component: CategoriesFormsComponent
            },
            {
                path: 'categories/form/:id',
                component: CategoriesFormsComponent
            },
            {
                path: 'orders',
                component: DashboardComponent
            },
            {
                path: 'users',
                component: UsersListComponent
            },
            {
                path: 'users/form',
                component: UsersFormComponent
            },
            {
                path: 'users/form/:id',
                component: UsersFormComponent
            }
        ]
    }
];

@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        ShellComponent,
        DashboardComponent,
        ProductsListComponent,
        ProductsFormComponent,
        CategoriesListComponent,
        CategoriesFormsComponent,
        UsersListComponent,
        UsersFormComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
        UsersModule,
        ...UX_MODULE
    ],
    providers: [MessageService, ConfirmationService, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule {}
