
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {Tutorial} from "../models/tutorial.model";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit {
  @Input()
  tutorialSelected : Tutorial | undefined ;
  @Output()
  closeForm = new EventEmitter<Boolean>();
  @Output()
  EmitTutorialData = new EventEmitter<Tutorial>();
  @Input()
  isEdit!: Boolean ;

  tutorialForm!: FormGroup;

  constructor() {
  }
  ngOnInit(): void {
    this.tutorialForm = new FormGroup({
    title: new FormControl(this.tutorialSelected?.title, [Validators.required, Validators.minLength(3)]),
    description: new FormControl(this.tutorialSelected?.description, [Validators.required, Validators.minLength(10)])
  });
  }

  OnFormSubmitted( ): void {
      this.tutorialSelected = this.tutorialForm.value ;
      this.EmitTutorialData.emit(this.tutorialForm.value);
      this.onCloseForm() ;
  }

  onCloseForm(): void {
    this.closeForm.emit(false);
  }


}
