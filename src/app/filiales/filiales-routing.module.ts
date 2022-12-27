import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FilialesComponent } from './filiales/filiales.component';

const routes: Routes = [
  {path: '', component: FilialesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilialesRoutingModule { }
