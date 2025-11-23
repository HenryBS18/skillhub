import { StudentService } from "~/services"
import type { Route } from "./+types/student"

const studentService = new StudentService()

export async function loader() {
  return await studentService.getAll()
}

export default function Student({ loaderData }: Route.ComponentProps) {
  return (
    <main className="p-6">
      <button className="btn btn-success">Tambah Peserta</button>

      <div className="mt-4 overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Nama</th>
              <th>NIM</th>
              <th>Email</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {
              loaderData.map((student, index) => (
                <tr key={student.id}>
                  <th>{index + 1}</th>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.nim}</td>
                  <td>{student.email}</td>
                  <td className="flex space-x-3">
                    <button className="btn btn-info">Detail</button>
                    <button className="btn btn-warning">Edit</button>
                    <button className="btn btn-error">Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </main>
  )
}
