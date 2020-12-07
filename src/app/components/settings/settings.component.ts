import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'firebase';

export interface Language {
  id: number;
  name: string;
}

export interface Experience {
  id: number;
  name: string;
}

export interface Reason {
  id: number;
  name: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  editPreferences: boolean = false;

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

  experienceData: Experience[] = [
    { id: 0, name: '0 - 2 years' },
    { id: 1, name: '2 - 4 years' },
    { id: 2, name: '4+ years' }
  ];

  reasonData: Reason[] = [
    { id: 0, name: 'For Class' },
    { id: 1, name: 'For Work' },
    { id: 2, name: 'Other' }
  ]

  edit() {
    if (this.editPreferences === true)
      this.editPreferences = false;
    else 
      this.editPreferences = true;
  }
  

  }
