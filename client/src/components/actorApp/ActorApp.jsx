import { Routes, Route } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

import ActorAdd from '../actor/ActorAdd';
import ListStructure from '../actor/ListStructure';
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Home from '../pages/Home';
import ActorEdit from '../actor/ActorEdit';

/** Component to render menu and the rutes that call their respective components */

const ActorApp = () => {
    return (
        <div className='app'>
            <Menu styles={styles}>
                <div className='textMenu'>
                    <img src={require('../../assets/house.png')} style={styles.bmImages} />
                    <a id="home" href="/" style={styles.bmText}>Home</a>
                </div>
                <hr />
                <div className='textMenu'>
                    <img src={require('../../assets/all.png')} style={styles.bmImages} />
                    <a id="actors" href="/actors" style={styles.bmText}>Actors</a>
                </div>
                <div className='textMenu'>
                    <img src={require('../../assets/add.png')} style={styles.bmImages} />
                    <a id="actorAdd" href="/actors/new" style={styles.bmText}>Create Actor</a>
                </div>
            </Menu>
            <div>
                <Header />  
            </div>
            <div className='container'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/actors' element={<ListStructure />} />
                    <Route path='/actors/edit/:id' element={<ActorEdit />} />
                    <Route path='/actors/new' element={<ActorAdd />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

const styles = {
    bmBurgerButton: {
        position: 'fixed',
        width: '36px',
        height: '30px',
        left: '36px',
        top: '25px',
        color: 'white',
    },
    bmImages: {
        position: 'fixed',
        width: '25px',
        height: '25px',
    },
    bmBurgerBars: {
        background: '#373a47'
    },
    bmBurgerBarsHover: {
        background: '#a90000'
    },
    bmCrossButton: {
        height: '24px',
        width: '24px',
    },
    bmCross: {
        background: '#bdc3c7'
    },
    bmMenuWrap: {
        position: 'fixed',
        height: '100%',
    },
    bmMenu: {
        background: '#373a47',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em'
    },
    bmMorphShape: {
        fill: '#373a47'
    },
    bmItemList: {
        color: '#b8b7ad',
    },
    bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'
    },
    bmText: {
        color: '#fff',
        padding: '1.25em',
        marginLeft: '1.5rem',
    }
}

export default ActorApp