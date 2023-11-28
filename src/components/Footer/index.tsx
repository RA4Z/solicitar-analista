import styles from './Footer.module.scss'
import { memo } from 'react'

function Footer() {
    return (
        <div className={styles.background}>
            <button>Solicitações para Analistas PCP WEN</button>
            <a href='https://github.com/RA4Z'>Desenvolvido e prototipado por Robert Aron Zimmermann robertn@weg.net</a>
        </div>
    )
}
export default memo(Footer)