import { useState } from "react";
import { auth } from "../firebaseconfig.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [mserror, setMserror] = useState(null);

  const RegistrarUsuarios = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, pass)
      .then((r) => alert("Usuario registrado"))
      .catch((e) => {
        if (e.code == "auth/invalid-email") {
          setMserror("Email is invalid");
        }
        if (e.code == "auth/weak-password") {
          setMserror("Password is invalid");
        }
      });
  };

  return (
    <div className="row mt-5">
      <div className="col"></div>
      <div className="col">
        <form className="form-group" onSubmit={RegistrarUsuarios}>
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            className="form-control mt-1"
            type="password"
            placeholder="Password"
            onChange={(e) => setPass(e.target.value)}
          ></input>
          <input
            className="btn btn-dark mt-3 w-100 "
            value="Registrar usuario"
            type="submit"
          />
        </form>
        {mserror != null ? <div className="alert alert-danger mt-2 text-center p-0">{mserror}</div> : <span></span>}
      </div>
      <div className="col"></div>
    </div>
  );
};
