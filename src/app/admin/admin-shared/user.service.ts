import { Injectable } from "@angular/core";
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from "@angular/router";
import * as firebase from 'firebase';

@Injectable()

export class UserService implements CanActivate {
    UserLoggedIn: boolean = false;
    loggedInUser: string;
    authUser: any;

    constructor(private _router: Router) {

        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyC7wMwFfUinRBUxyvfLg5QDuBxcdZBrI1I",
            authDomain: "gigabytegames-a9769.firebaseapp.com",
            databaseURL: "https://gigabytegames-a9769.firebaseio.com",
            projectId: "gigabytegames-a9769",
            storageBucket: "gigabytegames-a9769.appspot.com",
            messagingSenderId: "790779874981"
        };
        firebase.initializeApp(config);
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.verifyLogin(url);
    }
    verifyLogin(url: string): boolean {
        if (this.UserLoggedIn) { return true; }
        this._router.navigate(['/admin/login']);
        return false;
    }
    register(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(function (error) {
                alert(`${error.message} Please try again!`);
            });
    }
    verifyUser() {
        this.authUser = firebase.auth().currentUser;
        if (this.authUser) {
            alert(`Welcome ${this.authUser.email}`);
            this.loggedInUser = this.authUser.email;
            this.UserLoggedIn = true;
            this._router.navigate(['/admin']);
        }

    }
    login(loginEmail: string, loginPassword: string) {
        firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
            .catch(function (error) {
                alert(`${error.message} Unable to login. Try again!`);

            });
    }
    logout() {
        this.UserLoggedIn = false;
        firebase.auth().signOut().then(function () {
            alert('Logged out!');

        }, function (error) {
            alert(`${error.message} Unable to log out. Try again!`);
        });

    }

}