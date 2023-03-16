import { apiInstance } from '../http.service'
import { FetchClassesType } from './types';

class ClassesService {
  fetchClasses(grade: number) {
    return () => apiInstance.get<FetchClassesType>(`/${grade}/Column`).then((res) => res.data);
  }
}

export default new ClassesService()

