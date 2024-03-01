import {Component, OnInit} from '@angular/core';
import {TutorialService} from "../../service/tutorial.service";
import {Tutorial} from "../../models/tutorial.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.sass']
})
export class AddTutorialComponent implements OnInit{

  tutorialForm!: FormGroup ;
  showSuccessAlert : Boolean  = false ;
  constructor(private tutorialService: TutorialService ,private fb: FormBuilder , private router : Router) { }
  ngOnInit(): void {
    this.tutorialForm =this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)] ],
      description: ['', [Validators.required, Validators.minLength(10)]],
      published: [false, Validators.required]

    });
  }
  saveTutorial() {
    if (this.tutorialForm.valid) {
      const tutorialCreated = this.tutorialForm.value
      console.log('Form Data:',tutorialCreated);

      this.tutorialService.createTutorial(tutorialCreated)
        .subscribe({
          next: (response: Tutorial) => {
            console.log('Tutorial created successfully:', response);
            this.showSuccessAlert = true;
            setTimeout(() => {
              this.showSuccessAlert = false;
              this.router.navigateByUrl("/tutorials");
            }, 1500);
          },
          error: (error: any) => {
            console.error('Error creating tutorial:', error);
          }
        });
    }
  }


}
