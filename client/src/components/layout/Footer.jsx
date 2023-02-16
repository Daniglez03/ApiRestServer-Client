
const Footer = () => {
    const link = 'https://lacuesta.salesianos.edu';
    const target = '_blank';

    const divStyle = {textAlign: 'center', marginTop: '.5rem', marginBottom: '.5rem'}
    return (
        <div style={divStyle}>
            <strong>
                Copyright &copy; <small>{new Date().getFullYear()}</small>Acceso a datos{' '}
                <a href={link} target={target}>
                    salesianos-lacuesta
                </a>
            </strong>
        </div>
    );
}

export default Footer