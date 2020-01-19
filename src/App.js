import React, {Fragment, useState, useEffect} from 'react';
import Fomulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  /* Citas en localstorage */
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales) {
    citasIniciales = [];
  }

  /* Arreglos de citas */
  const [citas, guardarCitas] = useState(citasIniciales);

  /* useEffect para realizar citas operaciones cuando el state cambia */
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    if ( citasIniciales ) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas]);

  /* Función que tome las citas actuales y agregue la nueva */
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ])
  }

  /* Función que eliminar cita por su id */
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    guardarCitas(nuevasCitas)
  }

  /* Mensaje condicional */
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administrar tus citas'

  return (
    <Fragment>
      <h1>Administración de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Fomulario 
              crearCita = {crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita 
                key = {cita.id}
                cita = {cita}
                eliminarCita = {eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>

  );
}

export default App;
