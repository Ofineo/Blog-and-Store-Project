import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../admin-shared/user.service";

@Component({
    templateUrl:'./admin-menu.component.html',
    styleUrls:['./admin-menu.component.css']

})
export class AdminMenuComponent implements OnInit{
    theUser: string;

    constructor( private _userService: UserService, private _router: Router){}

    ngOnInit(){
        this.theUser = this._userService.loggedInUser;
    }
    logout(){
        this._userService.logout();
        this._router.navigate(['']);
     
    }
}