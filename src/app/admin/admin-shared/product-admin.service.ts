import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { Product } from "../admin-shared/product";

@Injectable()

export class ProductAdminService{
    createProduct(prod: Product){
        let storegeRef = firebase.storage().ref();
        storegeRef.child(`product_images/${prod.imgTitle}`).putString(prod.img, 'base64')
        .then((snapshot)=>{
            let url = snapshot.metadata.downloadURLs[0];
            let dbRef = firebase.database().ref('products/');
            let newProd = dbRef.push();
            newProd.set({
                name: prod.name,
                desc: prod.description,
                imgTitle: prod.imgTitle,
                img: prod.img,
                price: prod.price,
                id: newProd.key
            });
        })
        .catch ((error)=>{
            alert(`failed upload: ${error}`);
        });
    }
    editProd(update: Product){
        let dbRef = firebase.database().ref('products/').child(update.id)
        .update({
            name: update.name,
            desc: update.description,
            price: update.price
        });
        alert('product updated');
       }
    removeprod(deleteProd: Product){
        let dbRef= firebase.database().ref('products/').child(deleteProd.id).remove();
        alert('product deleted');
        let imageRef= firebase.storage().ref().child(`product_images/${deleteProd.imgTitle}`)
        .delete()
        .then(function(){
            alert(`${deleteProd.imgTitle} was deleted from storage`);
        }).catch(function(error){
            alert(`Error - Unable to delete ${deleteProd.imgTitle}`);
        });

    }

}
