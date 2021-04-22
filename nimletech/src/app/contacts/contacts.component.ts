import { Component, OnInit } from '@angular/core';

import { Contact } from '../models/contact';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
	contacts: Contact[];

  constructor(private networkService: NetworkService) { }

  ngOnInit(): void {
  	this.getContacts();
  }

  getContacts(): void {
    this.networkService.getContacts()
    .subscribe(contactObject => {
      this.contacts = contactObject["responseData"].contacts;
      console.log(contactObject);
      });
  }

}
