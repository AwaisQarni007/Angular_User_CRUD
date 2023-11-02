import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../service/toast.service';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  myform!: FormGroup;
  constructor(private toast: ToastService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.myform = this.fb.group({
      email: '',
      password: ''
    });

  }

  OnSubmit() {
    if (this.myform.controls['email'].value == "") {
      document.getElementById("exampleInputEmail1")?.focus();
      this.toast.showToast('Please enter Email!', 'Alert', 'warning');
    }
    else if (this.myform.controls['password'].value == "") {
      document.getElementById("exampleInputPassword1")?.focus();
      this.toast.showToast('Please enter Password!', 'Alert', 'warning');
    }
    else {
      this.toast.showToast(this.myform.controls['email'].value+` - `+this.myform.controls['password'].value+` - `+`Form Submitted Successfully!`, 'Success', 'success');
    }

  }

}
