import { ICourses } from '../../courses/models';
import { IStudent } from '../../students/models';

export interface IInscription {
  id?: number;
  studentId: number;
  courseId: number;
}

export interface IInscriptionWithStudentAndCourse extends IInscription {
  student: IStudent;
  course: ICourses;
}

export interface ICreateInscriptionPayload {
  studentId: number | null;
  courseId: number | null;
}
