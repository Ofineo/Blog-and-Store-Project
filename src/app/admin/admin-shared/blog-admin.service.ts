import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { Blog } from "../admin-shared/blog";

@Injectable()

export class BlogAdminService{
    createPost(post: Blog){
        let storegeRef = firebase.storage().ref();
        storegeRef.child(`images/${post.imgTitle}`).putString(post.img, 'base64')
        .then((snapshot)=>{
            let url = snapshot.metadata.downloadURLs[0];
            let dbRef = firebase.database().ref('blogPosts/');
            let newPost = dbRef.push();
            newPost.set({
                title: post.title,
                content: post.content,
                imgTitle: post.imgTitle,
                img: post.img,
                id: newPost.key
            });
        })
        .catch ((error)=>{
            alert(`failed upload: ${error}`);
        });
    }
    editPost(update: Blog){
        let dbRef = firebase.database().ref('blogPosts/').child(update.id)
        .update({
            title: update.title,
            content: update.content
        });
        alert('post updated');
       }
    removepost(deletePost: Blog){
        let dbRef= firebase.database().ref('blogPosts/').child(deletePost.id).remove();
        alert('post deleted');
        let imageRef= firebase.storage().ref().child(`images/${deletePost.imgTitle}`)
        .delete()
        .then(function(){
            alert(`${deletePost.imgTitle} was deleted from storage`);
        }).catch(function(error){
            alert(`Error - Unable to delete ${deletePost.imgTitle}`);
        });

    }

}
