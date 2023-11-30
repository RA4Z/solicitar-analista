import classNames from 'classnames'
import styles from './Lista.module.scss'
import { Divider } from '@mui/material'

interface Props {
    projeto: string,
    analista: string,
    solicitante: string,
    dataPrevista: string,
    dataFimReal: string,
    ganhoPrevisto: string,
    ganhoReal: string,
    status: string,
    onClick: (_: any) => any
}

export default function Lista(props: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.container__linha}>
                <li>{props.projeto} - {props.analista}</li>
                <li>Programado para {props.dataPrevista}</li>
                <li>Ganho previsto de {props.ganhoPrevisto}</li>
            </div>
            <div className={styles.container__linha}>
                <li>Solicitado por {props.solicitante}</li>
                {props.dataFimReal ? <li>Finalizado em {props.dataFimReal}</li> : <li>Projeto sem data fim real</li>}
                {props.ganhoReal ? <li>Ganho real de {props.ganhoReal}</li> : <li>Projeto sem ganho registrado</li>}
            </div>
            <div className={styles.container__linha}>
                <li className={styles.container__detalhes} onClick={props.onClick}>Ver detalhes</li>
                <li className={classNames(
                    styles.status,
                    styles[`status--${props.status.replace(' ', '_').toLowerCase()}`]
                )}>{props.status}</li>
                <li></li>
            </div>
            <Divider style={{ background: 'white', width: '100%', marginBottom: 25, marginTop: 20 }} />
        </div>
    )
}