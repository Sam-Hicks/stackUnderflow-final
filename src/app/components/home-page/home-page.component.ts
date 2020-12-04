import { Component, OnInit, Inject, NgZone, Input, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AuthService } from "../../shared/services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Comments } from 'src/app/shared/services/comment';
import { Observable, Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { User } from 'src/app/shared/services/user';
import { Post } from 'src/app/shared/services/posts';
import * as firebase from 'firebase';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {map, startWith, filter} from 'rxjs/operators';



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

   printComponent() {
     
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
  languages: string[] = ['Python'];
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