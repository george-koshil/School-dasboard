import { http } from "../http.service";
import {
  Student
} from "./types";

class StudentsService {
  async getStudents(): Promise<Student[]> {
    const students = await http.get<Student[]>('/students');
    return students.parsedBody as Student[]
  }

  async addStudent(student: Student): Promise<Student> {
    const newStudent = await http.post<Student>(`/student`, student);
    return newStudent.parsedBody as Student;
  }

  async addStudents(students: Student[]):  Promise<Student[]> {
    const newStudents = await http.post<Student[]>(`/students`, students);
    return newStudents.parsedBody as Student[];
  }

  async editStudent(studentData: Student): Promise<Student> {
    const updatedStudent = await http.put<Student>(`/student/${studentData._id}`, studentData);
    return updatedStudent.parsedBody as Student;
  }

  async deleteStudent(id: string): Promise<Student> {
    const deletedStudent = await http.delete<Student>(`/student/${id}`);
    return deletedStudent.parsedBody as Student;
  }

}

export default new StudentsService();
