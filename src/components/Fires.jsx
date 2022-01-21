import { useState, useEffect } from "react";
import { db } from "../firebaseconfig";
import {
  collection,
  query,
  nSnapshot,
  orderBy,
  addDoc,
  Timestamp,
} from "firebase/firestore";

export const Fires = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState("");
  const [error, setError] = useState(null);

  const setUsuarios = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Campo nombre vacio");
    } else if (!phone.trim()) {
      setError("Campo phone vacio");
    }
    try {
      const docRef = await addDoc(collection(db, "agenda"), {
        nombre: name,
        telefono: phone,
      });
      console.log("Documente written with ID: ", docRef.id);
    } catch (e) {
      console.error(e.message);
    }
    setName("");
    setPhone("");
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col">
          <h2>Formulario de Usuarios</h2>
          <form className="form-group" onSubmit={setUsuarios}>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Nombre"
              value={name}
            />
            <input
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              className="form-control mt-3"
              placeholder="Phone"
              value={phone}
            />
            <input
              type="submit"
              value="Registrar"
              className="btn btn-secondary btn-lg w-100 mt-4"
            />
          </form>
          {error ? <div>{error}</div> : <span></span>}
        </div>
        <div className="col">
          <h2>Lista de tu agenda</h2>
        </div>
      </div>
    </div>
  );
};
