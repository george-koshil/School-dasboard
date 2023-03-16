import { apiInstance } from "../http.service";
import {
  FetchRateStudentsResponseType,
  FetchStudentsResponseType,
  PinAsMissedParamsType,
  UnpinAsMissedParamsType,
} from "./types";

class StudentsService {
  fetchStudents(grade: number) {
    return () =>
      apiInstance
        .get<FetchStudentsResponseType>(`/${grade}/Schoolboy`)
        .then((res) => res.data);
  }

  fetchStudentRate(grade: number) {
    return () =>
      apiInstance
        .get<FetchRateStudentsResponseType>(`/${grade}/Rate`)
        .then((res) => res.data);
  }

  pinAsMissed(grade: number, params: PinAsMissedParamsType) {
    return apiInstance.post(`/${grade}/Rate`, { ...params, Title: 'Н' });
  }

  unpinAsMissed(grade: number, params: UnpinAsMissedParamsType) {
    return apiInstance.post(`/${grade}/UnRate`, { ...params }).then((res) => res.data);
  }
}

export default new StudentsService();
