import { redirect } from "react-router"
import { ClassService } from "~/services"
import { formDataParser } from "~/utils"
import type { Route } from "./+types/student-actions"

const classService = new ClassService()

export async function action({ request }: Route.ActionArgs) {
  const formData = await formDataParser(request)
  const intent = formData.intent

  switch (intent) {
    case 'add': return add(formData)
    case 'update': return update(formData)
    default: return
  }
}

async function add(formData: Record<string, string | undefined>) {
  await classService.create({
    name: formData.name!,
    description: formData.description!,
    instructor: formData.instructor!,
  })

  return redirect('/kelas')
}

async function update(formData: Record<string, string | undefined>) {
  await classService.updateById({
    id: formData.id!,
    name: formData.name!,
    description: formData.description!,
    instructor: formData.instructor!,
  })

  return redirect('/kelas')
}
