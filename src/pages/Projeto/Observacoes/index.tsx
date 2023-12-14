import dayjs from 'dayjs'
import styles from './Observacoes.module.scss'
import { Divider } from '@mui/material'

interface Props {
    visible: any,
    observacoes: { data: string, ocorrido: string, horaInicio: string, horaFim: string }[]
}

export default function Observacoes(props: Props) {
    const observer = props.observacoes.sort((a, b) => (dayjs(a.data) < dayjs(b.data)) ? -1 : 1)
    return (
        <>
            <div className={styles.overlay} onClick={() => props.visible(false)} />
            <div className={styles.container}>
                {observer.map(obs => (
                    <div className={styles.container__card}>
                        <li>{dayjs(obs.data).format('DD/MM/YYYY')} ----- {obs.horaInicio} até {obs.horaFim}</li>
                        <li>{obs.ocorrido}</li>
                        <Divider style={{ background: 'white', width: '100%', marginBottom: 25, marginTop: 20 }} />
                    </div>
                ))}
            </div>
        </>
    )
}