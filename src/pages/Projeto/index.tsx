import Button from 'components/Button'
import styles from './Projeto.module.scss'
import { useNavigate } from 'react-router-dom'
import VoltarIMG from 'assets/imagem_voltar.png'
import classNames from 'classnames';

export default function Projeto() {
    const status = "Não Iniciado"
    const navigate = useNavigate()
    return (
        <div className={styles.container}>
            <div className={classNames(
                styles.status_projeto,
                styles[`status_projeto--${status.replace(' ', '_').toLowerCase()}`]
            )}>

                Projeto {status}</div>
            <div className={styles.container__header}>
                <img src={VoltarIMG} alt='Voltar' onClick={() => navigate(-1)} />
                <h2>Título do Projeto - Nome do Analista</h2>
                <div />
            </div>
            <div className={styles.container__body}>
                Descrição sobre o projeto, diversas informações sobre o mesmo, blábláblá Descrição sobre o projeto, diversas informações sobre o mesmo, blábláblá Descrição sobre o projeto, diversas informações sobre o mesmo, blábláblá Descrição sobre o projeto, diversas informações sobre o mesmo, blábláblá Descrição sobre o projeto, diversas informações sobre o mesmo, blábláblá Descrição sobre o projeto, diversas informações sobre o mesmo, blábláblá Descrição sobre o projeto, diversas informações sobre o mesmo, blábláblá Descrição sobre o projeto, diversas informações sobre o mesmo, blábláblá Descrição sobre o projeto, diversas informações sobre o mesmo, blábláblá
            </div>
            <div className={styles.container__esperado}>
                <div>Programado para 31/01/2024</div>
                <div>Ganho previsto de 300R$</div>
            </div>
            <div className={styles.container__real}>
                <div>Finalizado em 28/11/2023</div>
                <div>Ganho real de 3.000.000R$</div>
            </div>
            <div className={styles.container__end}>
                Solicitado por Nome Solicitante
            </div>
            <Button texto='Visualizar Histórico de Observações' cor='azul claro' onClick={() => { }} />
        </div>
    )
}