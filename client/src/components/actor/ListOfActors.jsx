/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ActorService from '../../services/actore.service';

import { confirmAlert } from 'react-confirm-alert';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Message from '../message/Message';

/** Here i make an object with the fields id and the name that I will show */

const columns = [
    { id: 'id', label: 'ID' },
    { id: 'first_name', label: 'NOMBRE' },
    { id: 'last_name', label: 'APELLIDOS' },
    { id: 'last_update', label: 'ÚLTIMA ACTUALIZACIÓN' },
    { id: 'options', label: 'OPTIONS' }
];

/** here i make a function to a function to pass 
 * the actor info to an object with the required 
 * structure in the table  */

function createData(id, first_name, last_name, last_update) {
    return { id, first_name, last_name, last_update };
}

const ListOfActors = () => {
    const [actors, setActors] = useState([]);
    const [error, setError] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

    /** useEffect to display the actors every time 
     * you reload the page  */

    useEffect(() => {
        async function retrieveActors() {
            try {
                const data = await ActorService.getAll();
                setActors(data)
                setError(null)
            } catch (error) {
                console.log(error);
                setError(error)
            }
        }
        setTimeout(() => {
            retrieveActors();
        }, 2000);
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    /** I pass all the objects of all 
     * the obtained actors to an array */

    const rows = []
    const createAllObjActors = (actor) => {
        for (let i = 0; i < actors.length; i++) {
            rows.push(createData(actor[i].actor_id, actor[i].first_name, actor[i].last_name, actor[i].last_update))
        }
    }
    createAllObjActors(actors)

    const renderComponentById = (actor_id) => {
        const updateUrl = `/actors/edit/${actor_id}`
        return updateUrl
    }

    /** this function call the sentence and delete 
     * an actor after confirm */

    async function deleteActor(id) {
        try {
            await ActorService.remove(id);
            setActors(actors.filter((actors) => actors.actor_id !== id))
            setError(null)
        } catch (error) {
            console.log(error);
            setError(error)
        }
    }

    /** This function is to confirm the delete of the actor,
     *  when the delete button is pressed */

    const confirmDelete = (actor_id) => {
        confirmAlert({
            title: 'Confirmar eliminado',
            message: `Desea borrar el actor con id: ${actor_id}?`,
            buttons: [{ label: 'OK', onClick: () => deleteActor(actor_id) }, { label: 'Cancelar' }]
        });
    };

    /** for the table I use a material ui component */

    return (
        <section>
            {error && (
                <Message
                    msg={`Error ${error.code}: ${error.message}`}
                    bgColor='#dc3545'
                />
            )}
            <Paper className='table' sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        className='columns'
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth, backgroundColor: '#ffcc80', color:'black' }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody className='bck-color-table'>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                if (column.id === 'options') {
                                                    return (
                                                        <div className="col" key={column.id}>
                                                            <Link className="btn btn-primary" to={renderComponentById(row.id)}>Editar</Link>
                                                            <button className="btn btn-remove" onClick={() => confirmDelete(row.id)}>Borrar</button>
                                                        </div>
                                                    );
                                                }
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                className='bck-footer-color'
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </section>
    );
}

export default ListOfActors