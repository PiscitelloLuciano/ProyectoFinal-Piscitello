import { Component } from '@angular/core';
import { IStudent } from '../../models';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-students-detail',
  templateUrl: './students-detail.component.html',
  styleUrls: ['./students-detail.component.scss'],
})
export class StudentsDetailComponent {
  public student$: IStudent | undefined;

  constructor(
    private serv: StudentService,
    private activatedRoute: ActivatedRoute
  ) {
    this.loadStudent();
  }

  loadStudent(): void {
    this.serv
      .getStudentById(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: (student) => {
          this.student$ = student;
        },
      });
  }
}
