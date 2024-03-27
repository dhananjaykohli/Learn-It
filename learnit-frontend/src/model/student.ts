export default interface Student {
  studentId?: number;
  studentName: string;
  email: string;
  phone?: string;
  password: string;
  comments?: Comment[];
  studentCourses?: [];
}
