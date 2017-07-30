import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as firebase from "firebase";
import { UserService } from "../admin/admin-shared/user.service";
import { Blog } from "../admin/admin-shared/blog";

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {
    blogPosts: Blog[];

    constructor(private _UserService: UserService, private _router: Router) { }

    ngOnInit(): void {
       this.getPosts();
    }

     getPosts(){
        let dbRef = firebase.database().ref('blogPosts/');
        dbRef.once('value')
        .then((snapshot)=>{
            let tmp: string[]= snapshot.val();           
                this.blogPosts = Object.keys(tmp).map(key=> tmp[key])     
        });
    }
    choosePost(post: Blog){
        this._router.navigate(['/post', post.id]);
    }


}