import { Link, Outlet, useLocation } from "react-router"

export default function IndexLayout() {
  const location = useLocation()

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">SkillHub</a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-lg">
            <li className={`${location.pathname === '/peserta' ? 'border-b-2' : ''}`}><Link to={'/peserta'}>Peserta</Link></li>
            <li className={`${location.pathname === '/kelas' ? 'border-b-2' : ''}`}><Link to={'/kelas'}>Kelas</Link></li>
          </ul>
        </div>

        <div className="navbar-end" />
      </div>

      <Outlet />
    </>
  )
}
