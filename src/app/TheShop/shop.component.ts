import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as firebase from "firebase";
import { UserService } from "../admin/admin-shared/user.service";
import { Product } from "../admin/admin-shared/product";

@Component({
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.css']

})
export class ShopComponent implements OnInit {
    products: Product[];

    constructor(private _UserService: UserService, private _router: Router) { }

    ngOnInit(): void {
       this.getProducts();
    }

     getProducts(){
        let dbRef = firebase.database().ref('products/');
        dbRef.once('value')
        .then((snapshot)=>{
            let tmp: string[]= snapshot.val();           
                this.products = Object.keys(tmp).map(key=> tmp[key])     
        });
    }
    chooseProduct(prod: Product){
        this._router.navigate(['/product', prod.id]);
    }


}