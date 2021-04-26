import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from './core/shell/shell.service';

const routes: Routes = [
  { path: '', redirectTo: 'contact', pathMatch: 'full' },
  Shell.childRoutes([
    {
      path: 'contact',
      loadChildren: () =>
        import('./modules/home/home.module').then(
          m => m.HomeModule
        )
    }
  ]),

  // Fallback when no prior route is matched
  { path: '**', redirectTo: 'contact', pathMatch: 'full' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

export class AppRoutingModule { }

