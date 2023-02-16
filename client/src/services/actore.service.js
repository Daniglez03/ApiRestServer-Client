import axios from 'axios'

const API_URL = 'http://localhost:8000/api/v1'

const getAll = async () => {
    const response = await axios.get(`${API_URL}/actors`);
    const actors = response.data;
    return actors.data
}

const create = async (data) => {
    await fetch(`${API_URL}/actors`, {
        method: 'POST',
        body: JSON.stringify({
            first_name: data.first_name,
            last_name: data.last_name
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then( (res) => res.json())
    .catch( (err) => console.log(err.message))
}

const remove = async (id) => {
    await fetch(`${API_URL}/actors/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then( (res) => res.json())
    .catch( (err) => console.log(err.message))
}

const update = async (data, id) => {
    await fetch(`${API_URL}/actors/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            first_name: data.first_name,
            last_name: data.last_name
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then( (res) => res.json())
    .catch( (err) => console.log(err.message))
}

const searchById = async(id) => {
    const response = await axios.get(`${API_URL}/actors/${id}`);
    const actor = response.data;
    return actor.data
}

const ActorService = {
    getAll,
    create,
    remove,
    update,
    searchById,
}

export default ActorService