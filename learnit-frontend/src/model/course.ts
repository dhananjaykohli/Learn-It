export default interface Course {
  courseId: number;
  courseName: string;
  courseDescription: string;
  imgUrl?: string;
  price: number;
  createdAt: string;
  instructorId: number;
  progress?: number;
}
