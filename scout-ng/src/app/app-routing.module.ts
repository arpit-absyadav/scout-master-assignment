import { PacakgeListComponent } from './pacakge-list/pacakge-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditPackageComponent } from './edit-package/edit-package.component';

const routes: Routes = [
  { path: '', component: PacakgeListComponent },
  { path: 'edit/:id', component: EditPackageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
