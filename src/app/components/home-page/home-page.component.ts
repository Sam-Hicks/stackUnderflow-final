import { Component, OnInit, Inject, NgZone, Input } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AuthService } from "../../shared/services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Comments } from 'src/app/shared/services/comment';
import { Observable, Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { User } from 'src/app/shared/services/user';
import { Post } from 'src/app/shared/services/posts';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [DatePipe]
})
export class HomePageComponent implements OnInit  {
  user$: Observable<User>;
  // userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
  postsCol: AngularFirestoreCollection<Post>;
  posts: any;

  title: string;
  content: string;

  postsDoc: AngularFirestoreDocument<Post>;
  post: Observable<Post>;

  
  

  constructor(
    private afs: AngularFirestore,
    public dialog: MatDialog,
    public auth: AuthService,
    public router: Router,
    private route: ActivatedRoute,
    public ngZone: NgZone,
    ) {

    }

  ngOnInit() {
    this.postsCol = this.afs.collection('posts', ref => ref.orderBy("createdDate", "desc"));
    // this.posts = this.postsCol.valueChanges();
    this.posts = this.postsCol.snapshotChanges()
    .pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        // this.addPostId(id);
        return { id, data };
      })
    }))
  }

  // addPostId(id){

  // }


  newPost() {
     const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      this.dialog.open(DialogBox, dialogConfig);
   }



 }

 @Component({
  selector: 'app-dialog-box',
  templateUrl: 'dialog-box.html',
  styleUrls: ['./home-page.component.scss']
})
export class DialogBox extends HomePageComponent {

 

  addPost(pos: string) {
    this.dialog.closeAll();
  }
}