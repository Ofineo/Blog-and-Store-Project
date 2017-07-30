import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signUp/sign-up.component";
import { AdminMenuComponent } from "./adminMenu/admin-menu.component";
import { UserService } from './admin-shared/user.service';
import { AdminComponent } from "./adminComponent/admin.component";
import { BlogAdminService } from "./admin-shared/blog-admin.service";
import { BlogAdminComponent } from "./BlogAdmin/blog-admin.component";
import { BlogAddComponent } from "./blogAdd/blog-add.component";
import { TruncatePipe } from "./admin-shared/trunc.pipe";
import { ProductAdminService } from "./admin-shared/product-admin.service";
import { ProductAdminComponent } from "./ProductAdmin/product-admin.component";
import { ProductAddComponent } from "./productAdd/product-add.component";

const AdminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: 'product-admin', component: ProductAdminComponent, canActivate: [UserService] },
            { path: 'blog-admin', component: BlogAdminComponent, canActivate: [UserService] },
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignupComponent },
            { path: '', component: AdminMenuComponent, canActivate: [UserService] }
        ]
    },
]
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(AdminRoutes)
    ],
    exports: [
        RouterModule,
        TruncatePipe
    ],
    declarations: [
        AdminComponent,
        AdminMenuComponent,
        LoginComponent,
        SignupComponent,
        BlogAdminComponent,
        BlogAddComponent,
        TruncatePipe,
        ProductAdminComponent,
        ProductAddComponent
    ],
    providers: [
        UserService,
        BlogAdminService,
        ProductAdminService
    ]

})
export class AdminModule { }