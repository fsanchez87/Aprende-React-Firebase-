import { useState } from "react";
import { auth } from "../firebaseconfig.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const RegistrarUsuarios = (e) => {
    e.preventDefault();
    try {
      createUserWithEmailAndPassword(auth, email, pass);
      alert("Usuario registrado");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="row mt-5">
      <div className="col"></div>
      <div className="col">
        <form className="form-group" onSubmit={RegistrarUsuarios}>
          <input
            className="form-control"
            type="text"
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
      </div>
      <div className="col"></div>
    </div>
  );
};
