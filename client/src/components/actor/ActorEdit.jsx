import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { NotificationManager } from 'react-notifications';

import ActorService from "../../services/actore.service";
import Formulario from "./Formulario";

const initialActorState = {
    actor_id: null,
    first_name: '',
    last_name: ''
};

const ActorEdit = () => {
    const [currentActor, setCurrentActor] = useState(initialActorState);
    const [newActor, setNewActor] = useState(initialActorState);
    const { id } = useParams();
    const navigate = useNavigate()
    
    const searchActor = async () => {
        if (id !== undefined) {
            const actorById = await ActorService.searchById(id)
            setCurrentActor(actorById)
        }
    }
    searchActor()
    

    const handleChange = (e) => {
        setNewActor({
            ...newActor,
            [e.target.name] : e.target.value
        })
    }

    /** Function where I edit the actor with 
     * the sql statement, and correct errors with a couple of conditions */

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentActor.first_name.trim() === '' || currentActor.first_name.trim() === '') {
            NotificationManager.error('Todos los campos son necesarios');
            return;
        }
        const editActor = async () => {
            if (newActor.first_name === '') {
                setNewActor(newActor.first_name = currentActor.first_name)
            } else if (newActor.last_name === '') {
                setNewActor(newActor.last_name = currentActor.last_name)
            }
            const data = {
                first_name: newActor.first_name,
                last_name: newActor.last_name
            }
            try {
                await ActorService.update(data, id);
                NotificationManager.info('Actor editado...')
                setTimeout( () => {
                    navigate('/actors')
                }, 1000)
            } catch (error) {
                console.log(error);
            }
        }
        editActor();
    }

    return (
        <Formulario id={id} newActor={currentActor} currentActor={newActor} handleChange={handleChange} handleSubmit={handleSubmit} />
    )
}

export default ActorEdit