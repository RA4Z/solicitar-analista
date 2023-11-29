import styles from './Header.module.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom';
import Weg from 'assets/weg-logo.png'
import Button from 'components/Button';

export default function Header() {
    const navigate = useNavigate()
    const [show, setShow] = useState({
        cadastrar: false, atualizar: false
    })

    //cadastrar
    if (window.location.pathname === '/' && show.cadastrar === false) {
        setShow({ ...show, cadastrar: true, atualizar: false })
    } else if (window.location.pathname !== '/' && show.cadastrar === true) {
        setShow({ ...show, cadastrar: false })
    }

    //atualizar
    if (window.location.pathname.toLowerCase().indexOf('projeto') > 0 && show.atualizar === false) {
        setShow({ ...show, atualizar: true, cadastrar: false })
    } else if (window.location.pathname.toLowerCase().indexOf('projeto') === 0 && show.atualizar === true) {
        setShow({ ...show, atualizar: false })
    }

    //atualizando
    if (window.location.pathname.toLowerCase().indexOf('atualizar') > 0 && (show.atualizar || show.cadastrar)) {
        setShow({ ...show, atualizar: false, cadastrar: false })
    }

    return (
        <>
            <div className={styles.container}>
                <img src={Weg} alt='Logo da Weg' onClick={() => navigate('/')} />
                {show.cadastrar && <Button texto='Cadastrar Projeto' cor='azul' onClick={() => navigate('/Cadastro')} />}
                {show.atualizar && <Button texto='Atualizar Informações' cor='azul' onClick={() => navigate('/Atualizar/1')} />}
            </div>
            <Outlet />
        </>
    )
}