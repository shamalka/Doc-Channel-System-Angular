import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PsidebarComponent } from './psidebar/psidebar.component';
import { PnavbarComponent } from './pnavbar/pnavbar.component';
import { PfooterComponent } from './pfooter/pfooter.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    PfooterComponent,
    PnavbarComponent,
    PsidebarComponent
  ],
  exports: [
    PfooterComponent,
    PnavbarComponent,
    PsidebarComponent
  ]
})
export class ComponentsModule { }
