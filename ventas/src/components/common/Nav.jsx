import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Nav() {

  //Metodo para el control de la sidebar
  useEffect(() => {
    const sidebarToggle = document.body.querySelector('#sidebarToggle');

    const toggleSidebar = () => {
      document.body.classList.toggle('sb-sidenav-toggled');
      localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
    };

    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', toggleSidebar);

      return () => {
        sidebarToggle.removeEventListener('click', toggleSidebar);
      };
    }

  }, []); // El array vacío como segundo argumento asegura que el efecto solo se ejecute una vez, similar a componentDidMount


  return (
    <>
      
  <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
  {/* Navbar Brand*/}
  <Link className="navbar-brand ps-3" to="/admin">IVStore</Link>
  {/* Sidebar Toggle*/}
  <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars" /></button>

  {/* Navbar*/}
  <ul className="navbar-nav ms-auto me-0 me-md-3 my-2 my-md-0">
    <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw" /></a>
      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
        <li><a className="dropdown-item" href="#!">Settings</a></li>
        <li><a className="dropdown-item" href="#!">Activity Log</a></li>
        <li><hr className="dropdown-divider" /></li>
        <li><a className="dropdown-item" href="#!">Logout</a></li>
      </ul>
    </li>
  </ul>
</nav>

    </>
  )
}

export default Nav;
