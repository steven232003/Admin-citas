import React, { Fragment, useEffect, useState } from "react";
import Formulario from "./Components/Formulario.js";
import Cita from "./Components/Cita.jsx";

function App() {
  //citas en local storage
  let citasIniciales = localStorage.getItem("citas");
  if (!citasIniciales) {
    citasIniciales = [];
  }

  //Arreglo de citas
  const [citas, guardarCitas] = useState([citasIniciales]);

  const crearCita = (cita) => {
    guardarCitas([...citas, cita]);
  };

  //use Effect
  useEffect(() => {
    if (citasIniciales) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  });
  //Funcion eliminar Cita.
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    guardarCitas(nuevasCitas);
  };

  //cuando no hya citas que no aparezca

  const titulo = citas.length === 0 ? "No Hay Citas" : "Registro de citas";

  return (
    <Fragment>
      <div className="App">
        <h2>Administrador Pacientes </h2>

        <div className="container">
          <div className="row">
            <div className="one-half column">
              <Formulario crearCita={crearCita} />
            </div>

            <div className="one-half column">
              <h2>{titulo}</h2>
              {citas.map((cita) => (
                <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
