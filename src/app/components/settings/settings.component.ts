import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'firebase';

export interface Language {
  id: number;
  name: string;
}


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {


  constructor(
    public auth: AuthService,
    public router: Router,
    public ngZone: NgZone
  ) { }

  ngOnInit(): void {
    
  }

  lauguagesData: Language[] = [
    { id: 0, name: 'C' },
    { id: 1, name: 'C++' },
    { id: 2, name: 'C#' },
    { id: 3, name: 'Python' },
    { id: 4, name: 'Java' }
  ];


  hidePass = true;
  hidden: boolean = true;
  hiddenProf: boolean = true;

  editSurvey(cChecked: boolean, c: string, cShrpChecked: boolean, cShrp: string, cppChecked: boolean, 
    cpp: string, pyChecked: boolean, py: string, javaChecked: boolean, java: string, zeroSelected: boolean, 
    zero: string, zeroToTwoSelected: boolean, zeroToTwo: string, twoToFourSelected: boolean, twoToFour: string, 
    fourPlusSelected: boolean, fourPlus: string, forClassChecked: boolean, forClass: string, workChecked: boolean, 
    work: string, otherChecked: boolean, other: string) {
    // if(this.hidden === false) {
    //   this.languages = '';
    //   this.experience = '';
    //   this.reason = '';
    //   if (cChecked === true) 
    //     this.languages += c + ", ";
    //   if (cShrpChecked === true)
    //     this.languages += cShrp + ", ";
    //   if (cppChecked === true)
    //     this.languages += cpp + ", ";
    //   if (pyChecked === true)
    //     this.languages += py + ", ";
    //   if (javaChecked === true)
    //     this.languages += java;
      
    //   if (zeroSelected === true)
    //     this.experience = zero;
    //   if (zeroToTwoSelected === true)
    //     this.experience = zeroToTwo;
    //   if (twoToFourSelected === true)
    //     this.experience = twoToFour;
    //   if (fourPlusSelected === true)
    //     this.experience = fourPlus;
      
    //   if(forClassChecked === true)
    //     this.reason += forClass + ", ";
    //   if (workChecked === true)
    //     this.reason += work + ", ";
    //   if (otherChecked === true)
    //     this.reason += other;
    //   this.hidden = true;
    // } else
    //   this.hidden = false;
  }


  edit(user: string, pass: string, picker: Date, mail: string) {
    // if (this.hiddenProf === false) {
      // this.user.firstName = first;
      // this.lastName = last;
    //   this.user.username = user;
    //   this.user.password = pass;
    //   this.user.email = mail;
    //   this.hidePass = true;
    //   this.hiddenProf = true;
    // } else {
    //   this.hidePass = false;
    //   this.hiddenProf = false;
    // }}
  }
  }
