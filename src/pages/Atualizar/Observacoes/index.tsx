import styles from './Observacoes.module.scss'
import { useState } from 'react'
import Lixeira from 'assets/lixeira.png'
import { Divider } from '@mui/material'

interface Props {
    visible: any,
    observacoes: { data: string, ocorrido: string }[]
}

export default function Observacoes(props: Props) {
    const [obs, setObs] = useState(props.observacoes)

    function deletarObs(index: number) {
        setObs(props.observacoes.filter((_, i) => i !== index))
        props.observacoes.splice(index, 1)
    }

    return (
        <>
            <div className={styles.overlay} onClick={() => props.visible(false)} />
            <div className={styles.container}>
                {obs.map((obs, index) => (
                    <div className={styles.container__card} key={index}>
                        <div className={styles.container__date}>
                            <li>{obs.data}</li>
                            <img src={Lixeira} alt='Lixeira' title='Deletar Observação' onClick={() => deletarObs(index)} />
                        </div>
                        <li>{obs.ocorrido}</li>
                        <Divider style={{ background: 'white', width: '100%', marginBottom: 25, marginTop: 20 }} />
                    </div>
                ))}
            </div>
        </>
    )
}