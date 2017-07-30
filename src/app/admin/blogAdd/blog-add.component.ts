import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { BlogAdminService } from "../admin-shared/blog-admin.service";  
import { Blog } from "../admin-shared/blog";

@Component({
    selector: 'add-menu',
    templateUrl: './blog-add.component.html'   
})
export class BlogAddComponent{
    imgTitle: string;
    imageSRC: string;
    postTitle: string;
    content: string;
    post: Blog;

    constructor(private _blogAdminService: BlogAdminService, private _router: Router){}

    fileLoad($event: any){
        let myReader: FileReader = new FileReader();
        let file:File = $event.target.files[0];
        this.imgTitle = file.name;
        myReader.readAsDataURL(file);

        myReader.onload = (e:any)=> {
            this.imageSRC = e.target.result;
        }
    }
    createPost(){
        this.post = new Blog(
            this.postTitle,
            this.content,
            this.imgTitle,
            this.imageSRC.substring(23)
        );
        this._blogAdminService.createPost(this.post);
        alert(`${this.postTitle} added to posts`);
        this._router.navigate(['/admin']);
    }
    cancel(){
        this._router.navigate(['/admin']);
    }
}