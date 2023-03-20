import { http } from "../http.service";
import {
  Skipping
} from "./types";

class StudentsService {
  async getSkippings(): Promise<Skipping[]> {
    const students = await http.get<Skipping[]>('/skippings');
    return students.parsedBody as Skipping[]
  }

  async addSkipping(skipData: Skipping): Promise<Skipping> {
    const newSkippingData = await http.post<Skipping>(`/skipping`, skipData);
    return newSkippingData.parsedBody as Skipping;
  }


  async deleteSkipping(id: string): Promise<Skipping> {
    const deleteSkipping = await http.delete<Skipping>(`/skipping/${id}`);
    return deleteSkipping.parsedBody as Skipping;
  }
}

export default new StudentsService();
