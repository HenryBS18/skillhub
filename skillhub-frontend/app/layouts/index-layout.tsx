import { Link, Outlet } from "react-router"

export default function IndexLayout() {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">SkillHub</a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-lg">
            <li><Link to={'/peserta'}>Peserta</Link></li>
            <li><Link to={'/kelas'}>Kelas</Link></li>
          </ul>
        </div>

        <div className="navbar-end" />
      </div>

      <Outlet />
    </>
  )
}
