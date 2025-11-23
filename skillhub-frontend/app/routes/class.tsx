import { useRef, useState } from "react"
import { Form } from "react-router"
import { ClassService } from "~/services"
import type { Class } from "~/types"
import type { Route } from "./+types/class"

const classService = new ClassService()

export async function loader() {
  return await classService.getAll()
}

export default function Class({ loaderData }: Route.ComponentProps) {
  const addModalRef = useRef<HTMLDialogElement | null>(null)
  const detailModalRef = useRef<HTMLDialogElement | null>(null)
  const updateModalRef = useRef<HTMLDialogElement | null>(null)
  const deleteModalRef = useRef<HTMLDialogElement | null>(null)

  const [selectedClass, setSelectedClass] = useState<Class | null>(null)

  const handleOpenModal = (classData: Class, action: "detail" | "update" | "delete") => {
    setSelectedClass(classData)

    switch (action) {
      case "detail":
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
              <th>ID</th>
              <th>Nama</th>
              <th>Deskripsi</th>
              <th>Instruktor</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {loaderData.map((classData, index) => (
              <tr key={classData.id}>
                <th>{index + 1}</th>
                <td>{classData.id}</td>
                <td>{classData.name}</td>
                <td>{classData.description}</td>
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
              <span>Instruktor</span>
              <input type="text" name="instructor" placeholder="Instruktor" className="w-full input input-md" required />
            </label>

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
      <dialog id="detail-class-modal" className="modal" ref={detailModalRef}>
        <div className="modal-box">
          <h1 className="mb-4 text-lg font-bold">Detail Kelas</h1>

          <div className="flex flex-col space-y-3">
            <div>
              <p className="text-sm font-bold">ID:</p>
              <p>{selectedClass?.id}</p>
            </div>

            <div>
              <p className="text-sm font-bold">Nama:</p>
              <p>{selectedClass?.name}</p>
            </div>

            <div>
              <p className="text-sm font-bold">Deskripsi:</p>
              <p>{selectedClass?.description}</p>
            </div>

            <div>
              <p className="text-sm font-bold">Instruktor:</p>
              <p>{selectedClass?.instructor}</p>
            </div>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-error" onClick={() => setSelectedClass(null)}>
                Tutup
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Update Modal */}
      <dialog id="update-class-modal" className="modal" ref={updateModalRef}>
        <div className="modal-box">
          <h1 className="mb-4 text-lg font-bold">Update Kelas</h1>

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
              <span>Instruktor</span>
              <input type="text" name="instructor" className="w-full input input-md" defaultValue={selectedClass?.instructor} />
            </label>

            <div className="modal-action">
              <button className="btn btn-success" type="submit">Ubah</button>
              <form method="dialog">
                <button className="btn btn-error" onClick={() => setSelectedClass(null)}>
                  Batal
                </button>
              </form>
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
            <Form action="/actions/class" method="DELETE" onSubmit={() => deleteModalRef.current?.close()}>
              <input type="text" name="intent" defaultValue="delete" hidden />
              <input type="text" name="id" defaultValue={selectedClass?.id} hidden />
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
    </main>
  )
}
