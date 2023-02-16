import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { NotificationManager } from 'react-notifications';

import ActorService from "../../services/actore.service";
import Formulario from "./Formulario";

const initialActorState = {
    first_name: '',
    last_name: ''
};

/** This function create new actor with sql statement */

const ActorAdd = () => {
    const [currentActor, setCurrentActor] = useState(initialActorState);
    const { id } = useParams();
    const navigate = useNavigate()

    const handleChange = (e) => {
        setCurrentActor({
            ...currentActor,
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentActor.first_name.trim() === '' || currentActor.first_name.trim() === '') {
            NotificationManager.error('Todos los campos son necesarios');
            return;
        }
        const insertActor = async () => {
            try {
                await ActorService.create(currentActor);
                NotificationManager.success('Actor añadido...')
                setTimeout( () => {
                    navigate('/actors')
                }, 1000)
            } catch (error) {
                console.log(error);
            }
        }
        insertActor();
    }

    return (
        <Formulario id={id} currentActor={currentActor} handleChange={handleChange} handleSubmit={handleSubmit}/>
    )
}

export default ActorAdd