import React from "react";

export const Fires = () => {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col">
          <h2>Formulario de Usuarios</h2>
          <form className="form-group">
            <input type="text" className="form-control" placeholder="Nombre"/>
            <input type="text" className="form-control mt-3" placeholder="Nombre"/>
            <input type="submit" value="Registrar" className="btn btn-secondary btn-lg w-100 mt-4"/>
          </form>
          
          
        </div>
        <div className="col">
          <h2>Lista de tu agenda</h2>
        </div>
      </div>
    </div>
  );
};
