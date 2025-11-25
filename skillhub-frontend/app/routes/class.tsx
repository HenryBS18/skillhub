import { useRef, useState } from "react"
import { Form } from "react-router"
import { ClassService, StudentService } from "~/services"
import type { Class } from "~/types"
import type { Route } from "./+types/class"

const classService = new ClassService()
const studentService = new StudentService()

export async function loader() {
  return await classService.getAll()
}

export default function Class({ loaderData }: Route.ComponentProps) {
  const addModalRef = useRef<HTMLDialogElement | null>(null)
  const detailModalRef = useRef<HTMLDialogElement | null>(null)
  const updateModalRef = useRef<HTMLDialogElement | null>(null)
  const deleteModalRef = useRef<HTMLDialogElement | null>(null)

  const [selectedClass, setSelectedClass] = useState<Class | null>(null)
  const [classStudents, setStudentClasses] = useState<any[]>([])
  const [error, setError] = useState<boolean>(false)

  const detailClass = async (id: string) => {
    const students = await classService.getAllStudentById(id!)
    setStudentClasses(students)
  }

  const handleOpenModal = (classData: Class, action: "detail" | "update" | "delete") => {
    setSelectedClass(classData)

    switch (action) {
      case "detail":
        detailClass(classData.id)
        detailModalRef.current?.showModal()
        return
      case "update":
        detailClass(classData.id)
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
    setStudentClasses(prevStudents => prevStudents?.filter(student => student.id != id))
  }

  const handleRemoveClass = async () => {
    try {
      await classService.deleteById(selectedClass?.id!)
      window.location.reload()
    } catch (error) {
      setError(true)

      setTimeout(() => {
        setError(false)
      }, 3000)
    } finally {
      deleteModalRef.current?.close()
    }
  }

  return (
    <main className="p-6">
      <button className="btn btn-success" onClick={() => addModalRef.current?.showModal()}>
        Tambah Kelas
      </button>

      <div className="mt-4 overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Nama</th>
              <th>Deskripsi</th>
              <th>instruktur</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {loaderData.map((classData, index) => (
              <tr key={classData.id}>
                <th>{index + 1}</th>
                <td>{classData.name}</td>
                <td className="max-w-[200px] truncate">{classData.description}</td>
                <td>{classData.instructor}</td>
                <td className="flex space-x-3">
                  <button
                    className="btn btn-info"
                    onClick={() => handleOpenModal(classData, "detail")}
                  >
                    Detail
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleOpenModal(classData, "update")}
                  >
                    Ubah
                  </button>
                  <button
                    className="btn btn-error"
                    onClick={() => handleOpenModal(classData, "delete")}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      <dialog id="add-class-modal" className="modal" ref={addModalRef}>
        <div className="modal-box">
          <h1 className="mb-4 text-lg font-bold">Tambah Kelas</h1>

          <Form className="flex flex-col w-full space-y-5" action="/actions/class" method="POST" onSubmit={() => addModalRef.current?.close()}>
            <input type="text" name="intent" defaultValue="add" hidden />

            <label className="floating-label">
              <span>Nama Kelas</span>
              <input type="text" name="name" placeholder="Nama kelas" className="w-full input input-md" required />
            </label>

            <label className="floating-label">
              <span>Deskripsi</span>
              <input type="text" name="description" placeholder="Deskripsi" className="w-full input input-md" required />
            </label>

            <label className="floating-label">
              <span>instruktur</span>
              <input type="text" name="instructor" placeholder="instruktur" className="w-full input input-md" required />
            </label>

            <div className="modal-action">
              <button className="btn btn-success" type="submit">Tambah</button>

              <button className="btn btn-error" type="button" onClick={() => {
                addModalRef.current?.close()
                setSelectedClass(null)
              }}
              >
                Batal
              </button>
            </div>
          </Form>
        </div>
      </dialog>

      {/* Detail Modal */}
      <dialog id="detail-class-modal" className="modal" ref={detailModalRef}>
        <div className="modal-box">
          <h1 className="mb-4 text-lg font-bold">Detail Kelas</h1>

          <div className="flex flex-col space-y-3">
            <div>
              <p className="text-sm font-bold">Nama:</p>
              <p>{selectedClass?.name}</p>
            </div>

            <div>
              <p className="text-sm font-bold">Deskripsi:</p>
              <p>{selectedClass?.description}</p>
            </div>

            <div>
              <p className="text-sm font-bold">instruktur:</p>
              <p>{selectedClass?.instructor}</p>
            </div>

            <div>
              <p className="text-sm font-bold">Daftar Peserta:</p>
              <ul>
                {
                  classStudents?.length != 0 ? classStudents?.map((data) => (
                    <li key={data.id} className="flex space-x-2">- {data.student.name}</li>
                  )) : (
                    <p>-</p>
                  )
                }
              </ul>
            </div>
          </div>

          <div className="modal-action">
            <button className="btn btn-error" type="button" onClick={() => {
              detailModalRef.current?.close()
              setSelectedClass(null)
            }}
            >
              Tutup
            </button>
          </div>
        </div>
      </dialog>

      {/* Update Modal */}
      <dialog id="update-class-modal" className="modal" ref={updateModalRef}>
        <div className="modal-box">
          <h1 className="mb-4 text-lg font-bold">Ubah Kelas</h1>

          <Form className="flex flex-col w-full space-y-5" action="/actions/class" method="PATCH" onSubmit={() => updateModalRef.current?.close()}>
            <input type="text" name="intent" defaultValue="update" hidden />
            <input type="text" name="id" defaultValue={selectedClass?.id} hidden />

            <label className="floating-label">
              <span>Nama Kelas</span>
              <input type="text" name="name" className="w-full input input-md" defaultValue={selectedClass?.name} />
            </label>

            <label className="floating-label">
              <span>Deskripsi</span>
              <input type="text" name="description" className="w-full input input-md" defaultValue={selectedClass?.description} />
            </label>

            <label className="floating-label">
              <span>instruktur</span>
              <input type="text" name="instructor" className="w-full input input-md" defaultValue={selectedClass?.instructor} />
            </label>

            <div>
              <p className="text-sm font-bold">Daftar Peserta:</p>
              <ul>
                {
                  classStudents?.length != 0 ? classStudents?.map((data) => (
                    <li key={data.id} className="flex space-x-2">
                      <span>- {data.student.name}</span>
                      <span className="font-bold cursor-pointer" onClick={() => handleDeleteStudentClass(data.id)}>X</span>
                    </li>
                  )) : (
                    <p>-</p>
                  )
                }
              </ul>
            </div>

            <div className="modal-action">
              <button className="btn btn-success" type="submit">Ubah</button>

              <button className="btn btn-error" type="button" onClick={() => {
                updateModalRef.current?.close()
                setSelectedClass(null)
              }}
              >
                Batal
              </button>
            </div>
          </Form>
        </div>
      </dialog>

      {/* Delete Modal */}
      <dialog id="delete-class-modal" className="modal" ref={deleteModalRef}>
        <div className="modal-box">
          <h1 className="mb-4 text-lg font-bold">Hapus Kelas</h1>

          <p>
            Apakah anda yakin ingin menghapus kelas{" "}
            <span className="font-bold">{selectedClass?.name}</span>?
          </p>

          <div className="modal-action">
            <Form onSubmit={handleRemoveClass}>
              <button className="btn btn-success" type="submit">Hapus</button>
            </Form>

            <form method="dialog">
              <button className="btn btn-error" onClick={() => setSelectedClass(null)}>
                Batal
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Error Toast */}
      {
        error &&
        <div className="toast toast-top toast-center">
          <div className="alert alert-error">
            <span>Kelas tidak bisa dihapus. Mohon mengosongkan kelas terlebih dahulu</span>
          </div>
        </div>
      }
    </main>
  )
}
