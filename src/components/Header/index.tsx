import styles from './Header.module.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom';
import Weg from 'assets/weg-logo.png'
import Button from 'components/Button';

export default function Header() {
    const navigate = useNavigate()
    const [show, setShow] = useState({
        cadastrar: false
    })

    if (window.location.pathname === '/' && show.cadastrar === false) {
        setShow({ ...show, cadastrar: true })
    }
    if (window.location.pathname.toLowerCase().indexOf('cadastro') > 0 && show.cadastrar === true) {
        setShow({ ...show, cadastrar: false })
    }


    return (
        <>
            <div className={styles.container}>
                <img src={Weg} alt='Logo da Weg' onClick={() => navigate('/')} />
                {show.cadastrar && <Button texto='Cadastrar projeto' cor='azul' onClick={() => navigate('Cadastro')} /> }
            </div>
            <Outlet />
        </>
    )
}