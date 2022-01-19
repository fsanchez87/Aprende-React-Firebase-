import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebaseconfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const Menu = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser.email);
        console.log(currentUser.email);
      }
    });
  }, []);

  const CerrarSesion = () => {
    signOut(auth);
    setUser(null);
  };

  return (
    <div>
      <nav className="nav navbar-expand-lg navbar-dark bg-dark">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Inicio
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/admin">
              Admin
            </Link>
          </li>
        </ul>
        {user ? (
          <div
            className="btn btn-danger "
            onClick={CerrarSesion}
          >
            Logout
          </div>
        ) : (
          <span></span>
        )}
      </nav>
    </div>
  );
};
