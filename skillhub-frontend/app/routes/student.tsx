import { useRef, useState } from "react"
import { Form } from "react-router"
import { StudentService } from "~/services"
import type { Student } from "~/types"
import type { Route } from "./+types/student"

const studentService = new StudentService()

export async function loader() {
  return await studentService.getAll()
}

export default function Student({ loaderData }: Route.ComponentProps) {
  const addModalRef = useRef<HTMLDialogElement | null>(null)
  const detailModalRef = useRef<HTMLDialogElement | null>(null)
  const updateModalRef = useRef<HTMLDialogElement | null>(null)
  const deleteModalRef = useRef<HTMLDialogElement | null>(null)

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [studentClasses, setStudentClasses] = useState<any[]>([])
  const [classNotAssigned, setClassNotAssigned] = useState<any[]>([])

  const studentService = new StudentService()

  const handleOpenModal = async (student: Student, action: 'detail' | 'update' | 'delete') => {
    setSelectedStudent(student)

    const detailClass = async (id: string) => {

      const [classes, classNotAssigned] = await Promise.all([
        await studentService.getAllClassById(id!),
        await studentService.getAllClassNotAssigned(id!),
      ])

      setStudentClasses(classes)
      setClassNotAssigned(classNotAssigned)
    }

    switch (action) {
      case "detail":
        await detailClass(student.id)
        detailModalRef.current?.showModal()
        return
      case "update":
        updateModalRef.current?.showModal()
        return
      case "delete":
        deleteModalRef.current?.showModal()
        return
      default:
        return
    }
  }

  const handleDeleteStudentClass = async (id: string) => {
    await studentService.removeFromClass(id)
    setStudentClasses(prev => prev.filter(prevClasses => prevClasses.id != id))

    const classNotAssigned = await studentService.getAllClassNotAssigned(selectedStudent?.id!)
    setClassNotAssigned(classNotAssigned)
  }

  const assignClass = async (classId: string) => {
    await studentService.assignClass({ studentId: selectedStudent?.id!, classId })
    setClassNotAssigned(prev => prev.filter(prevClass => prevClass.id !== classId))

    const classes = await studentService.getAllClassById(selectedStudent?.id!)
    setStudentClasses(classes)
  }

  return (
    <main className="p-6">
      <button className="btn btn-success" onClick={() => addModalRef.current?.showModal()}>Tambah Peserta</button>

      <div className="mt-4 overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
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
                  <td>{student.name}</td>
                  <td>{student.nim}</td>
                  <td>{student.email}</td>
                  <td className="flex space-x-3">
                    <button className="btn btn-info" onClick={() => handleOpenModal(student, "detail")}>Detail</button>
                    <button className="btn btn-warning" onClick={() => handleOpenModal(student, "update")}>Ubah</button>
                    <button className="btn btn-error" onClick={() => handleOpenModal(student, "delete")}>Hapus</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      <dialog id="add-student-modal" className="modal" ref={addModalRef}>
        <div className="modal-box">
          <h1 className="mb-4 text-lg font-bold">Tambah Peserta</h1>

          <Form className="flex flex-col w-full space-y-5" action="/actions/student" method="POST" onSubmit={() => addModalRef.current?.close()}>
            <input type="text" name="intent" defaultValue="add" hidden />

            <label className="floating-label">
              <span>Nama</span>
              <input type="text" name="name" placeholder="Nama" className="w-full input input-md" required />
            </label>

            <label className="floating-label">
              <span>NIM</span>
              <input type="text" name="nim" placeholder="NIM" className="w-full input input-md" required />
            </label>

            <label className="floating-label">
              <span>Email</span>
              <input type="text" name="email" placeholder="Email" className="w-full input input-md" required />
            </label>

            {/* actions */}
            <div className="modal-action">
              <button className="btn btn-success" type="submit">Tambah</button>

              <form method="dialog">
                <button className="btn btn-error">Batal</button>
              </form>
            </div>
          </Form>
        </div>
      </dialog>

      {/* Detail Modal */}
      <dialog id="add-student-modal" className="modal" ref={detailModalRef}>
        <div className="modal-box">
          <h1 className="mb-4 text-lg font-bold">Detail Peserta</h1>

          <div className="flex flex-col space-y-3">
            <div>
              <p className="text-sm font-bold">Nama:</p>
              <p>{selectedStudent?.name}</p>
            </div>
            <div>
              <p className="text-sm font-bold">NIM:</p>
              <p>{selectedStudent?.nim}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Email:</p>
              <p>{selectedStudent?.email}</p>
            </div>

            <div>
              <p className="text-sm font-bold">Kelas yang diikuti:</p>

              <ul>
                {
                  studentClasses?.length != 0 ? studentClasses?.map((data) => (
                    <li key={data.id} className="flex space-x-2">
                      <span>- {data.class.name}</span>
                      <span className="font-bold cursor-pointer" onClick={() => handleDeleteStudentClass(data.id)}>X</span>
                    </li>
                  )) : (
                    <p>-</p>
                  )
                }
              </ul>

              {
                selectedStudent && (
                  <details className="dropdown my-1">
                    <summary className="btn btn-success m-1">Tambah kelas</summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                      {
                        classNotAssigned.length !== 0 ? classNotAssigned.map((value, i) => (
                          <li key={i}><a onClick={() => assignClass(value.id)}>{value.name}</a></li>
                        )) : (
                          <li>Tidak ada kelas lagi yang dapat diikuti</li>
                        )
                      }
                    </ul>
                  </details>
                )
              }
            </div>
          </div>

          {/* actions */}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-error" onClick={() => setSelectedStudent(null)}>Tutup</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Update Modal */}
      <dialog id="update-student-modal" className="modal" ref={updateModalRef}>
        <div className="modal-box">
          <h1 className="mb-4 text-lg font-bold">Update Peserta</h1>

          <Form className="flex flex-col w-full space-y-5" action="/actions/student" method="PATCH" onSubmit={() => updateModalRef.current?.close()}>
            <input type="text" name="intent" defaultValue="update" hidden />
            <input type="text" name="id" defaultValue={selectedStudent?.id} hidden />

            <label className="floating-label">
              <span>Nama</span>
              <input type="text" name="name" placeholder="Nama" className="w-full input input-md" defaultValue={selectedStudent?.name} />
            </label>

            <label className="floating-label">
              <span>NIM</span>
              <input type="text" name="nim" placeholder="NIM" className="w-full input input-md" defaultValue={selectedStudent?.nim} />
            </label>

            <label className="floating-label">
              <span>Email</span>
              <input type="text" name="email" placeholder="Email" className="w-full input input-md" defaultValue={selectedStudent?.email} />
            </label>

            {/* actions */}
            <div className="modal-action">
              <button className="btn btn-success" type="submit" onClick={() => updateModalRef.current?.close()}>Ubah</button>

              <form method="dialog">
                <button className="btn btn-error">Batal</button>
              </form>
            </div>
          </Form>

        </div>
      </dialog>

      {/* Delete Modal */}
      <dialog id="delete-student-modal" className="modal" ref={deleteModalRef}>
        <div className="modal-box">
          <h1 className="mb-4 text-lg font-bold">Hapus Peserta</h1>

          <p>Apakah anda yakin ingin menghapus peserta <span className="font-bold">{selectedStudent?.name}</span>?</p>

          {/* actions */}
          <div className="modal-action">
            <Form action="/actions/student" method="DELETE" onSubmit={() => deleteModalRef.current?.close()}>
              <input type="text" name="intent" defaultValue="delete" hidden />
              <input type="text" name="id" defaultValue={selectedStudent?.id} hidden />
              <button className="btn btn-success" type="submit">Hapus</button>
            </Form>

            <form method="dialog">
              <button className="btn btn-error" onClick={() => setSelectedStudent(null)}>Batal</button>
            </form>
          </div>
        </div>
      </dialog>
    </main>
  )
}
