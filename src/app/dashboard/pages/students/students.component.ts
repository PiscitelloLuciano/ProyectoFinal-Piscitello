import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IStudent } from './models';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from './services/student.service';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  public students: Observable<IStudent[]>;
  constructor(private matDialog: MatDialog, private serv: StudentService) {
    this.serv.loadStudents();
    this.students = this.serv.getStudents();
  }

  onCreateStudent(): void {
    this.matDialog
      .open(StudentsDialogComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.serv.createStudent({
              name: v.name,
              surname: v.surname,
              dateRegister: v.dateRegister,
            });
          }
        },
      });
  }

  onDeleteStudent(student: IStudent): void {
    if (confirm(`¿Está seguro de eliminar a ${student.name}?`) && student.id) {
      this.serv.deleteStudent(student.id);
    }
  }

  onEditStudent(student: IStudent): void {
    this.matDialog
      // ABRO EL MODAL
      .open(StudentsDialogComponent, {
        data: student,
      })
      .afterClosed()
      .subscribe({
        next: (studentUpdated) => {
          if (studentUpdated && student.id) {
            this.serv.updateStudent(student.id, studentUpdated);
          }
        },
      });
  }
}