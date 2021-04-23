import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { kendo } from './kendo-imports';
import { components } from './components';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...kendo],
  declarations: [
    ...components
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // Re-export Kendo modules
    ...kendo,

    // Shared components / directives / pipes
    ...components
  ],
  providers: [CurrencyPipe]
})
export class SharedModule {}
