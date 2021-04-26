import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'src/app/core/models/apiresponse';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ContactService } from 'src/app/core/services/contact.service';

import { Contact } from '../../../../core/models/contact';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

	isEdit: boolean = false;
	contact: Contact;
	uploadForm: FormGroup; 

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder, private contactService: ContactService,
    private location: Location) { }

  ngOnInit(): void {
  	this.uploadForm = this.formBuilder.group({
      photo: [''],
      name: [''],
      email: [''],
      number: [''],
      user_id: ['']
    });

  	this.getContact();
  }

  getContact() {
  	const id = this.route.snapshot.params.id;

     this.contactService.getContact(id)
    .subscribe({
      next: res => {
          this.contact = res.responseData.contact;
          console.log(this.contact);
      },
      error: err => {
        this.handleError(err);
      },
      complete: () => {}
    });
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

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('photo').setValue(file);
    }
  }

  onEdit() {
  	this.isEdit = !this.isEdit;
  }

  onCancel() {
    this.location.back();
  }

  onSubmit() {
  	const formData = new FormData();
    formData.append('file', this.uploadForm.get('photo').value);
    formData.append('name', this.uploadForm.get('name').value);
    formData.append('email', this.uploadForm.get('email').value);
    formData.append('number', this.uploadForm.get('number').value);
    formData.append('user_id', this.contact? this.contact.user_id : '');
    
    this.updateContact(formData);
  }

  updateContact(data) {
    const id = this.route.snapshot.params.id;
    this.contactService.updateContact(id, data)
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

}
