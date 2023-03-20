import { ClassElement } from 'typescript'
import StudentsService from './students-service/students.service'
import TeachersService from './teachers-service/teachers.service'
import LessonsService from './teachers-service/teachers.service'

const services = [
  StudentsService, 
  LessonsService, 
  TeachersService
].map((Service: any) => new Service())

export default services