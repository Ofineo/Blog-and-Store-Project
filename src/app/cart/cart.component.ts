import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ShoppingCartService } from "../shared/shopping-cart.service";

@Component({
    templateUrl: 'cart.component.html',
    styleUrls: ['cart.component.css']
})
export class CartComponent implements OnInit {
    myCart: any[];
    cartTotal: any;

    constructor(private _cartService: ShoppingCartService, private _router: Router) { }

    ngOnInit(): void {
        this._cartService.getCart()
            .then(theCart => this.myCart = theCart)
            .then(cart => this.sumCart(cart))
            .then(sum => this.cartTotal = sum);

    }
    sumCart(cart: any) {
        return Promise.resolve(cart.reduce((total: number, item: any) => total + item.price, 0));
    }
    removeCart(id:string){
        this._cartService.removeCart(id);
        this.sumCart(this.myCart).then(sum=>this.cartTotal = sum);
    }
    purchase(){
        alert(`Your Order Totaled ${this.cartTotal}`);
        this._router.navigate(['/shop']);
    }
    cancel(){
        this._router.navigate(['/shop']);
    }


}