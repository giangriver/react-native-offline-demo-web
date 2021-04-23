import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './pages/login/login.component';

import { component } from './components';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
  imports: [ SharedModule, LoginRoutingModule],
  declarations: [
    ...component,
    LoginComponent,
    RegisterComponent
  ]
})
export class LoginModule {}
