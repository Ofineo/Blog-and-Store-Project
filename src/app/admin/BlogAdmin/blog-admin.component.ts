import { Component, OnInit } from "@angular/core";
import { UserService } from "../admin-shared/user.service";  
import { Router } from "@angular/router";  
import * as firebase from "firebase";
import { BlogAdminService } from "../admin-shared/blog-admin.service";
import { Blog } from "../admin-shared/blog";

@Component({
    templateUrl: './blog-admin.component.html',
    styleUrls: ['./blog-admin.component.css']
})

export class BlogAdminComponent implements OnInit{
    theUser: string;
    menuChoice: string;
    blogPosts: Blog[];
    formDisplay: boolean= true;
    singlePost: Blog;

    constructor(
        private _userService : UserService,
        private _router: Router,
        private _blogAdminService: BlogAdminService
    ){}

    logout(){
        this._userService.logout();
        this._router.navigate(['']);
    }
    chooseMode(mode: string){
        this.menuChoice = mode;
    }
    ngOnInit(){
        this.theUser = this._userService.loggedInUser;
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
    editPost(thePost: Blog){
        this.singlePost = thePost;
        this.formDisplay= false;    
        }
    cancelEdit(){
        this.formDisplay= true;
    }
    updatePost(single: Blog){
        this._blogAdminService.editPost(single);
        this.formDisplay= true;
    }
    deletePost(single: Blog){
        let verify = confirm('Are you sure you want to delete this post?');
        if (verify==true) {
            this._blogAdminService.removepost(single);    
            this._router.navigate(['/admin/']);      
        } else {
           alert('Nothing Changed');        
        }
    }
}