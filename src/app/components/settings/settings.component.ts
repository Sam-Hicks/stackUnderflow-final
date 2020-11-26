import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  hidePass = true;
  hidden: boolean = true;
  hiddenProf: boolean = true;
  // firstName = this.loginComponent.firstName;
  // lastName = this.loginComponent.lastName;
  // DOB = this.loginComponent.DOB;
  // email = this.loginComponent.email;
  // username = this.loginComponent.username;
  // password = this.loginComponent.password;
  // languages = this.loginComponent.languages;
  // experience = this.loginComponent.experience;
  // reason = this.loginComponent.reason;
  title = 'Settings';

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


  edit(first: string, last: string, user: string, pass: string, picker: Date, mail: string) {
    // if (this.hiddenProf === false) {
    //   this.firstName = first;
    //   this.lastName = last;
    //   this.username = user;
    //   this.password = pass;
    //   this.email = mail;
    //   this.hidePass = true;
    //   this.hiddenProf = true;
    // } else {
    //   this.hidePass = false;
    //   this.hiddenProf = false;
    }
  }
