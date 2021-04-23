import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { pages } from './pages';

@NgModule({
  imports: [SharedModule, HomeRoutingModule],
  declarations: [...pages]
})
export class HomeModule {}
