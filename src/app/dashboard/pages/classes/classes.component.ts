import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ClassService } from './services/class.service';
import { IClass } from './models';
import { ClassDialogComponent } from './components/class-dialog/class-dialog.component';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent {
  public classes: Observable<IClass[]>;
  constructor(private matDialog: MatDialog, private serv: ClassService) {
    this.serv.loadClasses();
    this.classes = this.serv.getClasses();
  }

  onCreateClasses(): void {
    this.matDialog
      .open(ClassDialogComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.serv.createClasses({
              name: v.name,
              description: v.description,
            });
          }
        },
      });
  }

  onDeleteClasses(classes: IClass): void {
    if (confirm(`¿Está seguro de eliminar a ${classes.name}?`) && classes.id) {
      this.serv.deleteClasses(classes.id);
    }
  }

  onEditClasses(classes: IClass): void {
    this.matDialog
      // ABRO EL MODAL
      .open(ClassDialogComponent, {
        data: classes,
      })
      .afterClosed()
      .subscribe({
        next: (classesUpdated) => {
          if (classesUpdated && classes.id) {
            this.serv.updateClasses(classes.id, classesUpdated);
          }
        },
      });
  }
}
