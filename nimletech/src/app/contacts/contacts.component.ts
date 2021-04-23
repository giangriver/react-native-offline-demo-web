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
  searchTitle: '';

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

  onSearch() {
    return this.searchTitle? this.contacts.filter(item => (item.name.toUpperCase().includes(this.searchTitle.toUpperCase()) ||
      item.email.toUpperCase().includes(this.searchTitle.toUpperCase()) || item.number.includes(this.searchTitle))) : this.contacts;
  }

  onChangeEvent(event: any){
    console.log(event);
  }

}
