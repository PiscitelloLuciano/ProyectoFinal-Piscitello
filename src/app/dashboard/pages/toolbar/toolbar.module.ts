import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgIf } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontSizeTitleDirective } from './directives/font-size-title.directive';

@NgModule({
  declarations: [ToolbarComponent, FontSizeTitleDirective],
  imports: [
    CommonModule,
    NgIf,
    MatSidenavModule,
    SharedModule,
    MatToolbarModule,
  ],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
