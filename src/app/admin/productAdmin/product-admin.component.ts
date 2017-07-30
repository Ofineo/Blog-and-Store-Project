import { Component, OnInit } from "@angular/core";
import { UserService } from "../admin-shared/user.service";  
import { Router } from "@angular/router";  
import * as firebase from "firebase";
import { ProductAdminService } from "../admin-shared/product-admin.service";
import { Product } from "../admin-shared/product";

@Component({
    templateUrl: './product-admin.component.html',
    styleUrls: ['./product-admin.component.css']
})

export class ProductAdminComponent implements OnInit{
    theUser: string;
    menuChoice: string;
    theProducts: Product[];
    formDisplay: boolean= true;
    singleProduct: Product;

    constructor(
        private _userService : UserService,
        private _router: Router,
        private _prodAdminService: ProductAdminService
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
        this.getProducts();
    }
    getProducts(){
        let dbRef = firebase.database().ref('products/');
        dbRef.once('value')
        .then((snapshot)=>{
            let tmp: string[]= snapshot.val();           
                this.theProducts = Object.keys(tmp).map(key=> tmp[key])     
        });
    }
    editProduct(theProduct: Product){
        this.singleProduct = theProduct;
        this.formDisplay= false;    
        }
    cancelEdit(){
        this.formDisplay= true;
    }
    updateProduct(singleProduct: Product){
        this._prodAdminService.editProd(singleProduct);
        this.formDisplay= true;
    }
    deleteProduct(oneProduct: Product){
        let verify = confirm('Are you sure you want to delete this product?');
        if (verify==true) {
            this._prodAdminService.removeprod(oneProduct);    
            this._router.navigate(['/admin/']);      
        } else {
           alert('Nothing Changed');        
        }
    }
}