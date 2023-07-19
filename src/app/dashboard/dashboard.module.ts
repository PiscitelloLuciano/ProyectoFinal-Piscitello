import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ToolbarModule } from './pages/toolbar/toolbar.module';
import { UsersModule } from './pages/users/users.module';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, ToolbarModule, UsersModule, MatSidenavModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
