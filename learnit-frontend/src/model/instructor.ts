export default interface Instructor {
  instructorId?: number;
  instructorName: string;
  email: string;
  phone: string | null;
  password: string;
  bio?: string;
}
