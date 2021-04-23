import { NgModule, Optional, SkipSelf, APP_INITIALIZER } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule
} from '@angular/common/http';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { ShellModule } from './shell/shell.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    DialogsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ShellModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    DialogsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ShellModule
  ],
  providers: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(
        `${parentModule} has already been loaded. Import Core module in the AppModule only.`
      );
    }
  }
}
