import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../admin-shared/user.service";

@Component({
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.css']

})
export class LoginComponent{
    email: string;
    password1: string;
    constructor(private _userService: UserService, private _router: Router){}
    login(){
        this._userService.login(this.email, this.password1);
        this._userService.verifyUser();
    }
    signUp(){
        this._router.navigate(['/admin/signup']);
                    
        }
    cancel(){
        this._router.navigate([''])
    }
}