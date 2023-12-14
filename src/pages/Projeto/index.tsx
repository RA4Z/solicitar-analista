import Button from 'components/Button'
import styles from './Projeto.module.scss'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import VoltarIMG from 'assets/imagem_voltar.png'
import classNames from 'classnames';
import Observacoes from './Observacoes'
import { infoProjeto } from 'services/firestore'
import dayjs from 'dayjs'

export default function Projeto() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [obsVisible, setObsVisible] = useState(false)
    const [acesso, setAcesso] = useState(false)
    const [dados, setDados] = useState({
        analista: '',
        dataFimReal: '',
        dataPrevista: '',
        descricao: '',
        ganhoPrevisto: '',
        ganhoReal: '',
        observacoes: [{ data: '', ocorrido: '', horaInicio: '', horaFim: '' }],
        projeto: '',
        solicitante: '',
        status: ''
    })

    const visible = (childdata: boolean) => {
        setObsVisible(childdata)
    }

    if (dados.analista === '' && acesso === false) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        infoProjeto(id, setDados)
        setAcesso(true)
    }

    return (
        <div className={styles.container}>
            {obsVisible && <div className={styles.container__obs}>
                <Observacoes observacoes={dados.observacoes} visible={visible} />
            </div>}
            {dados.status && <div className={classNames(
                styles.status_projeto,
                styles[`status_projeto--${dados.status.replace(' ', '_').toLowerCase()}`]
            )}>
                Projeto {dados.status}</div>}
            <div className={styles.container__header}>
                <img src={VoltarIMG} alt='Voltar' onClick={() => navigate(-1)} />
                <h2>{dados.projeto} - {dados.analista}</h2>
                <div />
            </div>
            <div className={styles.container__body}>
                {dados.descricao}
            </div>
            <div className={styles.container__esperado}>
                <div>Programado para {dayjs(dados.dataPrevista).format('DD/MM/YYYY')}</div>
                <div>Ganho previsto de {dados.ganhoPrevisto}</div>
            </div>
            <div className={styles.container__real}>
                {dados.dataFimReal && <div>Finalizado em {dayjs(dados.dataFimReal).format('DD/MM/YYYY')}</div>}
                {dados.ganhoReal && <div>Ganho real de {dados.ganhoReal}</div>}
            </div>
            <div className={styles.container__end}>
                Solicitado por {dados.solicitante}
            </div>
            <Button texto='Visualizar Histórico de Observações' cor='azul claro' onClick={() => setObsVisible(true)} />
        </div>
    )
}