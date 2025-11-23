export type Student = {
  id: string
  name: string
  nim: string
  email: string
}

export type CreateStudent = Omit<Student, 'id'>

export type AssignClass = {
  studentId: string
  classId: string
}

export type Class = {
  id: string
  name: string
  description: string
  instructor: string
}

export type CreateClass = Omit<Class, 'id'>