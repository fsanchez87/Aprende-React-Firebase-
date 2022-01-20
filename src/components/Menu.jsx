import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebaseconfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Menu = () => {
  const navigate = useNavigate();
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
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Inicio
            </Link>
          </li>
          <li>
            {!user ? (
              <Link className="nav-link" to="/login">
                Login
              </Link>
            ) : (
              <span></span>
            )}
          </li>
          <li>
            {!user ? (
              <Link className="nav-link" to="/admin">
                Admin
              </Link>
            ) : (
              <span></span>
            )}
          </li>
        </ul>
        {user ? (
          <div className="btn btn-danger align-item-end" onClick={CerrarSesion}>
            Logout
          </div>
        ) : (
          <span></span>
        )}
      </nav>
    </div>
  );
};
