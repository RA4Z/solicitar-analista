import Button from 'components/Button'
import styles from './Projeto.module.scss'
import VoltarIMG from 'assets/imagem_voltar.png'

export default function Projeto() {
    return (
        <div className={styles.container}>
            <div className={styles.status_projeto}>Projeto Concluído</div>
            <div className={styles.container__header}>
                <img src={VoltarIMG} alt='Voltar' />
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