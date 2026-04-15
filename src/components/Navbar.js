import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <span className="navbar-brand">HooksApp</span>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink
              to="/"
              end
              className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/about"
              className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            >
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/profile"
              className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            >
              Profile
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
