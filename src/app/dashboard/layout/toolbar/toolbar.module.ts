import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgIf } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontSizeTitleDirective } from './directives/font-size-title.directive';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ToolbarComponent, FontSizeTitleDirective, NavMenuComponent],
  imports: [
    CommonModule,
    NgIf,
    MatSidenavModule,
    SharedModule,
    MatToolbarModule,
    MatListModule,
    RouterModule,
  ],
  exports: [ToolbarComponent, NavMenuComponent],
})
export class ToolbarModule {}
