import { ClassService } from "~/services"
import type { Route } from "./+types/class"

const classService = new ClassService()

export async function loader() {
  return await classService.getAll()
}

export default function Class({ loaderData }: Route.ComponentProps) {
  return (
    <main className="p-6">
      <button className="btn btn-success">Tambah Kelas</button>

      <div className="mt-4 overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Nama</th>
              <th>Deskripsi</th>
              <th>Instruktor</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {
              loaderData.map((classData, index) => (
                <tr key={classData.id}>
                  <th>{index + 1}</th>
                  <td>{classData.id}</td>
                  <td>{classData.name}</td>
                  <td>{classData.description}</td>
                  <td>{classData.instructor}</td>
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
