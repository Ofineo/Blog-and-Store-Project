import { Component } from "@angular/core";
import { UserService } from "../admin-shared/user.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']

})
export class SignupComponent {
    email: string;
    password1: string;
    password2: string;
    passwordFail: boolean = false;
    constructor(private _userService: UserService, private _router: Router) { }
    signUp() {
        if (this.password1 !== this.password2) {
            this.passwordFail = true;
        } else {
            this.passwordFail = false;
            this._userService.register(this.email, this.password1);
            this._userService.verifyUser();
        }
    }
    cancel(){
        this._router.navigate(['/admin/login']);
    }

}