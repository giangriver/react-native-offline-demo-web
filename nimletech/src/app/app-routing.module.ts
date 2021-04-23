import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from './core/shell/shell.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  Shell.childRoutes([
    {
      path: 'home',
      loadChildren: () =>
        import('./modules/home/home.module').then(
          m => m.HomeModule
        )
    }
  ]),

  // Fallback when no prior route is matched
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
