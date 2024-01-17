import styles from './Footer.module.scss'
import { memo, useState } from 'react'
import { Divider, Snackbar, TextField } from '@mui/material'
import { sugerir } from 'services/database'
import Button from 'components/Button'

import Logo from 'assets/weg-logo-white.png'

function Footer() {
    const [comunica, setComunica] = useState({ email: '', texto: '' })
    const [statusToast, setStatusToast] = useState({ visivel: false, message: '' })

    async function sendSuggestion() {
        if (comunica.texto === '') {
            setStatusToast({ message: 'Não é permitido enviar uma sugestão vazia!', visivel: true })
            return
        }
        await sugerir(comunica.texto)
        setStatusToast({ message: 'Sugestão enviada com sucesso!', visivel: true })
        setComunica({ email: '', texto: '' })
    }

    return (
        <div className={styles.container}>
            <div className={styles.background}>
                <div>
                    <img src={Logo} alt='Logo da Weg' className={styles.background__logotipo} />
                    <div className={styles.background__dev}>
                        <button className={styles.container__button}>Solicitar Analistas</button>
                        <a href='https://github.com/RA4Z'>Desenvolvido e prototipado por<br /> Robert Aron Zimmermann</a>
                        <p>robertn@weg.net</p>
                    </div>
                </div>
                <div className={styles.faleConosco}>
                    <li>Sugestões</li>
                    <TextField id="Fale-Conosco"
                        label="Escreva Aqui"
                        value={comunica.texto}
                        rows={4}
                        multiline
                        onChange={e => setComunica({ ...comunica, texto: e.target.value })}
                        className={styles.faleConosco__input} />
                    <Button cor='azul' texto='Enviar' onClick={() => sendSuggestion()} />
                </div>

                <div className={styles.atribuicoes}>
                    <li style={{ listStyle: 'none', textAlign: 'center', color: '#64CCC5' }}>Contato dos Analistas:</li>
                    <a href="https://colaboradores.weg.net/colaboradores.aspx?chave=C_1001_31798" target="_blank" rel="noreferrer"><li>Alisson Mazuim - alisson@weg.net</li></a>
                    <a href="https://colaboradores.weg.net/colaboradores.aspx?chave=C_1001_35973" target="_blank" rel="noreferrer"><li>Anderson Paulo da Luz - andersonpl@weg.net</li></a>
                    <a href="https://colaboradores.weg.net/colaboradores.aspx?chave=C_1001_77661" target="_blank" rel="noreferrer"><li>Daniel Assis Amancio - amanciod@weg.net</li></a>
                    <a href="https://colaboradores.weg.net/colaboradores.aspx?chave=C_1001_77660" target="_blank" rel="noreferrer"><li>Fabiana Glasenapp - fglasenapp@weg.net</li></a>
                    <a href="https://colaboradores.weg.net/colaboradores.aspx?chave=C_1001_68954" target="_blank" rel="noreferrer"><li>Karoline Luciani Fritsche karolinel@weg.net</li></a>
                    <a href="https://colaboradores.weg.net/colaboradores.aspx?chave=C_1001_76993" target="_blank" rel="noreferrer"><li>Rogerio Henrique de Oliveira Schneider rogeriohs@weg.net</li></a>
                    <a href="https://colaboradores.weg.net/colaboradores.aspx?chave=C_1001_49109" target="_blank" rel="noreferrer"><li>Rohan Dorneles Machado - rohan@weg.net</li></a>
                </div>
            </div>
            <Divider style={{ background: 'white', margin: 10 }} />
            <p>Solicitar Analistas - PCP WEN</p>
            <Snackbar
                open={statusToast.visivel}
                onClose={() => setStatusToast({ ...statusToast, visivel: false })}
                autoHideDuration={3000}
                message={statusToast.message}
            />
        </div>
    )
}
export default memo(Footer)