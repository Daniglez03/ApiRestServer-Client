/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react"
import { NotificationContainer } from "react-notifications"
import { Link } from "react-router-dom"

/** This componente is used in Create and Edit actor, 
 * and is used to display the visual part  */

const Formulario = ({ id, newActor, currentActor, handleChange, handleSubmit }) => {

    const [currentActors, setCurrentActors] = useState({ currentActor })

    const placeholderName = () => {
        return !id ? 'Introduzca Nombre' : newActor.first_name
    }
    const placeholderLastName = () => {
        return !id ? 'Introduzca Apellidos' : newActor.last_name
    }

    const showCurrentActor = () => {
        return (
            <div className='infoActor'>
                <li>Id: {newActor.actor_id}</li>
                <li>Last Update: {newActor.last_update}</li>
            </div>
        );
    }

    return (
        <div className="modal-content">
            <NotificationContainer />
            <div className="modal-header">
                <h2>
                    {!id ? 'Nuevo Actor' : 'Editar Actor'}
                </h2>
            </div>
            <div className="modal-body">
            {id ? showCurrentActor() : null}
                <form className="space-inputs" onSubmit={handleSubmit}>
                    <div className="mb-3 mx-3">
                        <label htmlFor="fname" className="form-label">
                            Nombre
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="fname"
                            name="first_name"
                            placeholder={placeholderName()}
                            onChange={handleChange}
                            value={currentActors.first_name}
                        />
                    </div>
                    <div className="mb-3 mx-3">
                        <label htmlFor="lname" className="form-label">
                            Apellidos
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="lname"
                            name="last_name"
                            placeholder={placeholderLastName()}
                            onChange={handleChange}
                            value={currentActors.last_name}
                        />
                    </div>
                    <div className="mb-3 mx-3 centered">
                        <button className="btn btn-primary-generator-btn mr-3">
                            Grabar
                        </button>
                        <Link to='/actors' className="btn btn-danger">
                            Cancelar{' '}
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Formulario