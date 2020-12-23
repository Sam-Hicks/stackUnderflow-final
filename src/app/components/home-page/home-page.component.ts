import { Component, OnInit, Inject, NgZone, Input, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AuthService } from "../../shared/services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QueryDocumentSnapshot } from '@angular/fire/firestore';

import { Observable, Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { User } from 'src/app/shared/services/user';
import { Post } from 'src/app/shared/services/posts';
import { map, startWith, filter } from 'rxjs/operators';
import * as firebase from 'firebase';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [DatePipe]
})
export class HomePageComponent implements OnInit  {

  postsCol: AngularFirestoreCollection<Post>;
  posts: any;

  title: string;
  content: string;

  postsDoc: AngularFirestoreDocument<Post>;
  post: Observable<Post>;

  commentsCol: AngularFirestoreCollection<Comment>;
  comments: any;
  
  edit: boolean = true;

  languages: string[] = ['Python', 'C', 'C++'];
  dataset = ['All Threads', 'C Threads', 'C# Threads', 'C++ Threads', 'Python Threads', 'Java Threads'];

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
    this.posts = this.postsCol.snapshotChanges()
    .pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, data };
      })
    }))

  }

  exitPost(){
    this.edit = true;
  }

  editPost() {
    this.edit = false;
  }

  editPost1(postId, content) {
    this.afs.doc('posts/'+postId).update({'content': content});
    this.edit = true;
}  

  getComments(postId){
    this.commentsCol = this.afs.collection('posts/'+postId+'/comments', ref => ref.orderBy("createdDate", "desc"));
    this.comments = this.commentsCol.valueChanges();
  }

  getAllPosts(){
    this.postsCol = this.afs.collection('posts', ref => ref.orderBy("createdDate", "desc"));
    this.posts = this.postsCol.snapshotChanges()
    .pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, data };
      })
    }))
  }

  getCPosts(){
    this.postsCol = this.afs.collection('posts', ref => ref.where("tags", "array-contains", "C").orderBy("createdDate", "desc"));
    this.posts = this.postsCol.snapshotChanges()
    .pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, data };
      })
    }))
  }

  getCPlusPosts(){
    this.postsCol = this.afs.collection('posts', ref => ref.where("tags", "array-contains", "C++").orderBy("createdDate", "desc"));
    this.posts = this.postsCol.snapshotChanges()
    .pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, data };
      })
    }))
  }
  getCSharpPosts(){
    this.postsCol = this.afs.collection('posts', ref => ref.where("tags", "array-contains", "C#").orderBy("createdDate", "desc"));
    this.posts = this.postsCol.snapshotChanges()
    .pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, data };
      })
    }))
  }

  getPythonPosts(){
    this.postsCol = this.afs.collection('posts', ref => ref.where("tags", "array-contains", "Python").orderBy("createdDate", "desc"));
    this.posts = this.postsCol.snapshotChanges()
    .pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, data };
      })
    }))
  }

  getJavaPosts(){
    this.postsCol = this.afs.collection('posts', ref => ref.where("tags", "array-contains", "Java").orderBy("createdDate", "desc"));
    this.posts = this.postsCol.snapshotChanges()
    .pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, data };
      })
    }))
  }

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
export class DialogBox {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeyCodes: number[] = [ENTER, COMMA];
  languageCtrl = new FormControl();
  filteredLanguages: Observable<string[]>;
  languages: string[] = [];
  allLanguages: string[] = ['C', 'C#', 'C++', 'Python', 'Java'];

  @ViewChild('languageInput') languageInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(public auth: AuthService) {
    
    this.filteredLanguages = this.languageCtrl.valueChanges.pipe(
      startWith(null),
      map((language: string | null) => language ? this._filter(language) : this.allLanguages.slice()));
  }
 
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our language
    if ((value || '').trim()) {
      this.languages.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.languageCtrl.setValue(null);
  }

  remove(language: string): void {
    const index = this.languages.indexOf(language);

    if (index >= 0) {
      this.languages.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.languages.push(event.option.viewValue);
    this.languageInput.nativeElement.value = '';
    this.languageCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allLanguages.filter(language => language.toLowerCase().indexOf(filterValue) === 0);
  }

}