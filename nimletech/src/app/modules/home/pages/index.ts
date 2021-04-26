import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HomeComponent } from './home.component';

export const pages: any[] = [
    HomeComponent,
    ContactsComponent,
    ContactDetailComponent,
    ContactAddComponent
];

export * from './home.component';
