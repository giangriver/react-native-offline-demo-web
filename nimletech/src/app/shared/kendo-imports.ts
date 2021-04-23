import { DynamicFormsKendoUIModule } from '@ng-dynamic-forms/ui-kendo';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import {
  SplitterModule,
  StepperModule,
  TabStripModule
} from '@progress/kendo-angular-layout';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { PagerModule } from '@progress/kendo-angular-pager';
import { GridModule } from '@progress/kendo-angular-grid';
import { PopupModule } from '@progress/kendo-angular-popup';
import { TooltipModule } from '@progress/kendo-angular-tooltip';

export const kendo: any[] = [
  DynamicFormsKendoUIModule,
  ButtonModule,
  DatePickerModule,
  InputsModule,
  LabelModule,
  SplitterModule,
  StepperModule,
  DialogsModule,
  NotificationModule,
  PagerModule,
  TabStripModule,
  DropDownsModule,
  LayoutModule,
  GridModule,
  PopupModule,
  TooltipModule
];
