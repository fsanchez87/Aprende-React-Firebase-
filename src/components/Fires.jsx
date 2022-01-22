import { useState, useEffect } from "react";
import { db } from "../firebaseconfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

export const Fires = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agenda, setAgenda] = useState([]);
  const [error, setError] = useState(null);
  const [idUsuario, setIdUsuario] = useState("");
  const [modoEdicion, setModoEdicion] = useState(null);

  useEffect(() => {
    const getAgenda = async () => {
      const { docs } = await getDocs(collection(db, "agenda"));
      const nuevoArray = docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAgenda(nuevoArray);
    };
    getAgenda();
  }, []);

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
      const { docs } = await getDocs(collection(db, "agenda"));
      const nuevoArray = docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAgenda(nuevoArray);
    } catch (e) {
      console.error(e.message);
    }
    setName("");
    setPhone("");
  };

  const setUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Campo nombre vacio");
    } else if (!phone.trim()) {
      setError("Campo phone vacio");
    }
    try {
      const docToUpdate = doc(db, "agenda", idUsuario);
      await updateDoc(docToUpdate, {
        telefono: phone,
        nombre: name,
      });
      const { docs } = await getDocs(collection(db, "agenda"));
      const nuevoArray = docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAgenda(nuevoArray);
    } catch (error) {
      console.log(error.message);
    }

    setName('')
    setPhone('')
    setIdUsuario('')
    modoEdicion(false)
  };

  const delUsuario = async (id) => {
    try {
      await deleteDoc(doc(db, "agenda", id));
      const { docs } = await getDocs(collection(db, "agenda"));
      const nuevoArray = docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAgenda(nuevoArray);
    } catch (error) {
      console.log(error);
    }
  };

  const modoActulizar = async (id) => {
    try {
      const docs = await getDoc(doc(db, "agenda", id));
      console.log(docs.data());
      const { nombre, telefono } = docs.data();
      setName(nombre);
      setPhone(telefono);
      setIdUsuario(id);
      setModoEdicion(true);
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col">
          <h2>Formulario de Usuarios</h2>
          <form
            className="form-group"
            onSubmit={modoEdicion ? setUpdate : setUsuarios}
          >
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
            {modoEdicion ? (
              <input
                type="submit"
                value="Actualizar"
                className="btn btn-secondary btn-lg w-100 mt-4"
              />
            ) : (
              <input
                type="submit"
                value="Registrar"
                className="btn btn-secondary btn-lg w-100 mt-4"
              />
            )}
          </form>
          {error ? <div>{error}</div> : <span></span>}
        </div>
        <div className="col">
          <h2>Lista de tu agenda</h2>

          {agenda.length === 0 ? (
            <span>No hay contactos</span>
          ) : (
            agenda.map((contacto) => (
              <ul className="list-group">
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={contacto.id}
                >
                  {contacto.nombre} - {contacto.telefono}
                  <div>
                    <button
                      type="button"
                      onClick={(id) => {
                        modoActulizar(contacto.id);
                      }}
                      className="btn btn-warning mx-2 "
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={(id) => {
                        delUsuario(contacto.id);
                      }}
                      className="btn btn-danger"
                    >
                      Borrar
                    </button>
                  </div>
                </li>

                <br />
              </ul>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
