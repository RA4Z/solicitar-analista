import classNames from 'classnames'
import styles from './Lista.module.scss'
import { Divider } from '@mui/material'
import dayjs from 'dayjs'

interface Props {
    projeto: string,
    analista: string,
    solicitante: string,
    dataPrevista: string,
    dataFimReal: string,
    ganhoPrevisto: string,
    ganhoReal: string,
    status: string,
    observacoes: { data: string, ocorrido: string }[],
    onClick: (_: any) => any
}

export default function Lista(props: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.container__linha}>
                <li>{props.projeto} - {props.analista}</li>
                <li>Programado para {dayjs(props.dataPrevista).format('DD/MM/YYYY')}</li>
                {Number(props.ganhoPrevisto) > 0? <li>Ganho previsto de {props.ganhoPrevisto}R$</li> : <li>Projeto sem ganho previsto registrado</li>}
            </div>
            <div className={styles.container__linha}>
                <li>Solicitado por {props.solicitante}</li>
                {props.dataFimReal ? <li>Finalizado em {dayjs(props.dataFimReal).format('DD/MM/YYYY')}</li> : <li>Projeto sem data fim real</li>}
                {props.ganhoReal ? <li>Ganho real de {props.ganhoReal}R$</li> : <li>Projeto sem ganho real registrado</li>}
            </div>
            <div className={styles.container__linha}>
                <li className={styles.container__detalhes} onClick={props.onClick}>Ver detalhes</li>
                <li className={classNames(
                    styles.status,
                    styles[`status--${props.status.replace(' ', '_').toLowerCase()}`]
                )}>{props.status}</li>
                {props.observacoes.length > 0? <li>Observações Cadastradas: {props.observacoes.length}</li> : <li>Nenhuma Observação Cadastrada</li>}
            </div>
            <Divider style={{ background: 'white', width: '100%', marginBottom: 25, marginTop: 20 }} />
        </div>
    )
}