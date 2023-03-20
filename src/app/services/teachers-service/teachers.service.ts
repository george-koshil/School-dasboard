import { http, HttpResponse } from "../http.service";
import {
  Teacher
} from "./types";

class TeachersService {
  async getTeachers(): Promise<Teacher[]> {
    const teacher = await http.get<Teacher[]>('/teachers');
    return teacher.parsedBody as Teacher[]
  }

  async addTeacher(teacher: Teacher): Promise<Teacher> {
    const newTeacher = await http.post<Teacher>(`/teacher`, teacher);
    return newTeacher.parsedBody as Teacher;
  }

  async addTeachers(teachers: Teacher[]): Promise<Teacher[]> {
    const newTeachers = await http.post<Teacher[]>(`/teachers`, teachers);
    return newTeachers.parsedBody as Teacher[];
  }

  async editTeacher(teacherData: Teacher): Promise<Teacher> {
    const updatedTeacher = await http.put<Teacher>(`/teachers/${teacherData._id}`, teacherData);
    return updatedTeacher.parsedBody as Teacher;
  }

  async deleteTeacher(id: string): Promise<Teacher> {
    const deletedTeacher = await http.delete<Teacher>(`/teacher/${id}`);
    return deletedTeacher.parsedBody as Teacher;
  }
}

export default new TeachersService();
