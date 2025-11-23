import { redirect } from "react-router"
import { StudentService } from "~/services"
import { formDataParser } from "~/utils"
import type { Route } from "./+types/student-actions"

const studentService = new StudentService()

export async function action({ request }: Route.ActionArgs) {
  const formData = await formDataParser(request)
  const intent = formData.intent

  switch (intent) {
    case 'add': return add(formData)
    case 'update': return update(formData)
    case 'delete': return remove(formData)
    default: return
  }
}

async function add(formData: Record<string, string | undefined>) {
  await studentService.create({
    name: formData.name!,
    nim: formData.nim!,
    email: formData.email!
  })

  return redirect('/peserta')
}

async function update(formData: Record<string, string | undefined>) {
  await studentService.updateById({
    id: formData.id!,
    name: formData.name!,
    nim: formData.nim!,
    email: formData.email!
  })

  return redirect('/peserta')
}

async function remove(formData: Record<string, string | undefined>) {
  await studentService.deleteById(formData.id!)

  return redirect('/peserta')
}