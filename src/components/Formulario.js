import React, {Fragment, useState} from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    /* Crear State de Citas */
    const [cita, actualizarCita] = useState({
        mascota     : '',
        propietario : '',
        fecha       : '',
        hora        : '',
        sintomas    : ''
    });

    const [error, actualizarError] = useState(false)

    /* Funcicón que se ejecuta cada vez que el usuario escribe en el input */
    const handleChange = e => {
        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        })
    }

    /* Extraer valores */
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    /* Evento Subtmit */
    const handleSubmitCita = e => {
        e.preventDefault();

        /* Valir form */
        if( mascota.trim()      === ''  || 
            propietario.trim()  === ''  || 
            fecha.trim()        === ''  ||
            hora.trim()         === ''  ||
            sintomas.trim()     === '') {
            
            actualizarError(true);
            console.log("hay un error")
            return;
        }

        /* Eliminar mensaje de error */
        actualizarError(false);

        /* Asignar un ID */
        cita.id = uuid();

        /* Crear la cita */
        crearCita(cita)

        /* Reiniciar el form */
        actualizarCita({
            mascota     : '',
            propietario : '',
            fecha       : '',
            hora        : '',
            sintomas    : ''
        });
    }

    return(
        <Fragment>
            <h2>Crear Citas</h2>
            {error === true ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}
            <form
                onSubmit={handleSubmitCita}
            >
                <label>
                    Nombre Mascota
                    <input 
                        type="text"
                        placeholder="Nombre mascota"
                        name="mascota"
                        className="u-full-width"
                        onChange={handleChange}
                        value={mascota}
                    />
                </label>
                <label>
                    Nombre Dueño
                    <input 
                        type="text"
                        placeholder="Nombre dueño"
                        name="propietario"
                        className="u-full-width"
                        onChange={handleChange}
                        value={propietario}
                    />
                </label>
                <label>
                    Fecha
                    <input 
                        type="date"
                        name="fecha"
                        className="u-full-width"
                        onChange={handleChange}
                        value={fecha}
                    />
                </label>
                <label>
                    Hora
                    <input 
                        type="time"
                        name="hora"
                        className="u-full-width"
                        onChange={handleChange}
                        value={hora}
                    />
                </label>
                <label>
                    Sintomas
                    <textarea
                        className="u-full-width"
                        name="sintomas"
                        onChange={handleChange}
                        value={sintomas}
                    ></textarea>
                </label>
                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Citas</button>
            </form>
        </Fragment>
    )
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;