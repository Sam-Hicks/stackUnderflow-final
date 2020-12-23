import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

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

  selectedExperience: string;
  experiences: string[] = ['0 years', '0 - 2 years', '2 - 4 years', '4+ years'];
  experienceControl = new FormControl('', [Validators.required]);

  form: FormGroup;
  form1: FormGroup;
  lauguagesData: Language[] = [
    { id: 0, name: 'C' },
    { id: 1, name: 'C++' },
    { id: 2, name: 'C#' },
    { id: 3, name: 'Python' },
    { id: 4, name: 'Java' }
  ];

  reasonsData: Reason[] = [
    { id: 0, name: 'For class' },
    { id: 1, name: 'For work' },
    { id: 2, name: 'Other' }
  ];

  constructor(
    public auth: AuthService,
    public router: Router,
    public ngZone: NgZone,
    private fb: FormBuilder
  ) { }

  onChangeEventFunc(name: string, isChecked: boolean) {
    const languages = (this.form.controls.name as FormArray);

    if (isChecked['checked']) {
      languages.push(new FormControl(name));
    } else {
      const index = languages.controls.findIndex(x => x.value === name);
      languages.removeAt(index);
    }
  }

  onChangeEventFunc1(name: string, isChecked: boolean) {
    const reasons = (this.form1.controls.name as FormArray);

    if (isChecked['checked']) {
      reasons.push(new FormControl(name));
    } else {
      const index = reasons.controls.findIndex(x => x.value === name);
      reasons.removeAt(index);
    }
  }


  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.array([])
    });

    this.form1 = this.fb.group({
      name: this.fb.array([])
    });
  }

  
  edit() {
    if (this.editPreferences === true)
      this.editPreferences = false;
    else 
      this.editPreferences = true;
  }
}