import { http, HttpResponse } from "../http.service";
import {
  Lesson
} from "./types";

class StudentsService {
  async getLessons(): Promise<Lesson[]>{
    const lessons = await http.get<Lesson[]>('/lessons');
    return lessons.parsedBody as Lesson[]
  }

  async addLesson(lesson: Lesson): Promise<Lesson> {
    const newLesson = await http.post<Lesson>(`/lesson`, lesson);
    return newLesson.parsedBody as Lesson;
  }

  async addLessons(lessons: Lesson[]):  Promise<Lesson[]>{
    const newLessons = await http.post<Lesson[]>(`/lessons`, lessons);
    return newLessons.parsedBody as Lesson[];
  }

}

export default new StudentsService();
