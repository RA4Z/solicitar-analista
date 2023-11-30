import styles from './Observacoes.module.scss'
import { Divider } from '@mui/material'

interface Props {
    visible: any,
    observacoes: { data: string, ocorrido: string }[]
}

export default function Observacoes(props: Props) {
    return (
        <>
            <div className={styles.overlay} onClick={() => props.visible(false)} />
            <div className={styles.container}>
                {props.observacoes.map(obs => (
                    <div className={styles.container__card}>
                        <li>{obs.data}</li>
                        <li>{obs.ocorrido}</li>
                        <Divider style={{ background: 'white', width: '100%', marginBottom: 25, marginTop: 20 }} />
                    </div>
                ))}
            </div>
        </>
    )
}