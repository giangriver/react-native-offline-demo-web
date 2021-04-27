import { Component, OnInit } from '@angular/core';
import { ApiResponse } from 'src/app/core/models/apiresponse';
import { AuthService } from 'src/app/core/services/auth.service';
import { ContactService } from 'src/app/core/services/contact.service';

import { Contact } from '../../../../core/models/contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];
  searchTitle: '';

  constructor(
    private contactService: ContactService,
    private authenService: AuthService
    ) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.contactService.getContacts()
    .subscribe({
      next: res => {
          this.contacts = res.responseData.contacts;
      },
      error: err => {
        this.handleError(err);
      },
      complete: () => {}
    });
  }

  onSearch(): any {
    return this.searchTitle ? this.contacts.filter(item => (item.name && (item.name.toUpperCase().includes(this.searchTitle.toUpperCase())) ||
      (item.email && item.email.toUpperCase().includes(this.searchTitle.toUpperCase())) || (item.number && item.number.includes(this.searchTitle)))) : this.contacts;
  }

  onChangeEvent(event: any): void{
    console.log(event);
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

  logout(): any {
    this.authenService.logout();
  }

}
