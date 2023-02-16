const Home = () => {
    const link = 'http://localhost:3000/actors';
    const target = '_self';
    return (
        <div className="container">
            <h1>MERN Stack CRUD</h1>
            <p>
                <b>Front-End</b>: React.js v18
            </p>
            <p>
                <b>Back-end</b>: Node.js, Express.js
            </p>
            <p><b>Database</b>: MySQL</p>
            <p>
                <b>Developed By</b>: Acceso a datos
                <p>
                    <a href={link} target={target}>
                        Listado de actores
                    </a>
                </p>
            </p>
        </div>
    )
}

export default Home