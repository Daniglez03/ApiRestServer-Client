import 'react-confirm-alert/src/react-confirm-alert.css';
import Loader from "../loader/Loader";
import ListOfActors from "./ListOfActors";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/** Here I organize the structure of the route '/actors',
 *  the button to create an actor and the table are shown in the
 *  'ListOfActors' component */

const ListStructure = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <>
            <div className="subtitle">
                <h3>Listado de actores</h3>
                <Link to='/actors/new' className="btn btn-primary">
                    Crear actor
                </Link>
            </div>
            <section>
                {loading && <Loader />}
                {ListOfActors()}
            </section>
        </>
    );
}

export default ListStructure