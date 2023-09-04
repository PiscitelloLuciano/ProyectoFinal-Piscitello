import { Component } from '@angular/core';
import { UserService } from '../users/services/user.service';
import { CoursesService } from '../courses/services/courses.service';
import { StudentService } from '../students/services/student.service';
import { Observable } from 'rxjs';
import { IUser } from '../users/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public users$: Observable<IUser[]>;
  public courses$;
  public students$;
  constructor(
    private userService: UserService,
    private courseService: CoursesService,
    private studentService: StudentService
  ) {
    this.userService.loadUsers();
    this.users$ = this.userService.getUsers();
    this.courseService.loadCourses();
    this.courses$ = this.courseService.getCourses();
    this.studentService.loadStudents();
    this.students$ = this.studentService.getStudents();
  }
}
