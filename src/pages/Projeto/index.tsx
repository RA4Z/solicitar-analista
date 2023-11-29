import Button from 'components/Button'
import styles from './Projeto.module.scss'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import VoltarIMG from 'assets/imagem_voltar.png'
import classNames from 'classnames';
import Observacoes from './Observacoes'

export default function Projeto() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [obsVisible, setObsVisible] = useState(false)
    const [dados, setDados] = useState({
        analista: 'Nome do Analista',
        dataFimReal: '29/11/2023',
        dataPrevista: '31/01/2024',
        descricao: 'Descrição sobre o projeto, diversas informações sobre o mesmo, blábláblá Descrição sobre o projeto, diversas informações sobre o mesmo, blábláblá Descrição sobre o projeto, diversas informações sobre o mesmo, blábláblá Descrição sobre o projeto, diversas informações sobre o mesmo, blábláblá Descrição sobre o projeto, diversas informações sobre o mesmo, blábláblá Descrição sobre o projeto, diversas informações sobre o mesmo, blábláblá Descrição sobre o projeto, diversas informações sobre o mesmo, blábláblá Descrição sobre o projeto, diversas informações sobre o mesmo, blábláblá Descrição sobre o projeto, diversas informações sobre o mesmo, blábláblá',
        ganhoPrevisto: '300R$',
        ganhoReal: '3.000.000R$',
        observacoes: [{ data: '22/11/2023', ocorrido: 'Foi feito tal modificação em tal coisa' }],
        projeto: 'Título do Projeto',
        solicitante: 'Nome Solicitante',
        status: 'Não Iniciado'
    })
    const visible = (childdata: boolean) => {
        setObsVisible(childdata)
    }
    return (
        <div className={styles.container}>
            {obsVisible && <div className={styles.container__obs}>
                <Observacoes observacoes={dados.observacoes} visible={visible} />
            </div>}
            <div className={classNames(
                styles.status_projeto,
                styles[`status_projeto--${dados.status.replace(' ', '_').toLowerCase()}`]
            )}>

                Projeto {dados.status}</div>
            <div className={styles.container__header}>
                <img src={VoltarIMG} alt='Voltar' onClick={() => navigate(-1)} />
                <h2>{dados.projeto} - {dados.analista}</h2>
                <div />
            </div>
            <div className={styles.container__body}>
                {dados.descricao}
            </div>
            <div className={styles.container__esperado}>
                <div>Programado para {dados.dataPrevista}</div>
                <div>Ganho previsto de {dados.ganhoPrevisto}</div>
            </div>
            <div className={styles.container__real}>
                {dados.dataFimReal && <div>Finalizado em {dados.dataFimReal}</div>}
                {dados.ganhoReal && <div>Ganho real de {dados.ganhoReal}</div>}
            </div>
            <div className={styles.container__end}>
                Solicitado por {dados.solicitante}
            </div>
            <Button texto='Visualizar Histórico de Observações' cor='azul claro' onClick={() => setObsVisible(true)} />
        </div>
    )
}