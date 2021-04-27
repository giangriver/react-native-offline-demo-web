import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { ApiResponse } from 'src/app/core/models/apiresponse';

import { ContactService } from 'src/app/core/services/contact.service';

import { Contact } from '../../../../core/models/contact';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css']
})
export class ContactAddComponent implements OnInit {
	uploadForm: FormGroup; 

  constructor(private formBuilder: FormBuilder, 
    private contactService: ContactService, private location: Location) { }

  ngOnInit(): void {
  	this.uploadForm = this.formBuilder.group({
      photo: [''],
      name: [''],
      email: [''],
      number: ['']
    });
  }

   onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('photo').setValue(file);
    }
  }

  onSubmit() {
  	const formData = new FormData();
    formData.append('file', this.uploadForm.get('photo').value);
    formData.append('name', this.uploadForm.get('name').value);
    formData.append('email', this.uploadForm.get('email').value);
    formData.append('number', this.uploadForm.get('number').value);
    
    this.createContacts(formData);
  }

  createContacts(data): void {
    this.contactService.createContact(data)
    .subscribe({
      next: res => {
          console.log(res);
          this.location.back();
      },
      error: err => {
        this.handleError(err);
      },
      complete: () => {}
    });
  }

  onCancel() {
    this.location.back();
  }

  handleError(error: ApiResponse): void {
    if (error.violations) {
      let message = '';
      for (const violation of (error as ApiResponse).violations || []) {
        message += violation.message + ' ';
      }
      console.log(message);
    } else {
      console.log(error.message);
    }
  }

}
