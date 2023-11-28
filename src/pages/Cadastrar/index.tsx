import { TextField } from '@mui/material'
import styles from './Cadastrar.module.scss'
import Button from 'components/Button'

export default function Cadastrar() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Solicitar trabalho para um analista</h1>
            <div className={styles.linhaStart}>
                <TextField id="cadastrar-titulo"
                    className={styles.input}
                    label="Título do Projeto" />
                <TextField id="cadastrar-analista"
                    className={styles.input}
                    label="Analista Responsável" />
            </div>
            <TextField id="cadastrar-descricao"
                className={styles.input__description}
                rows={7}
                multiline
                label="Descrição do projeto" />

            <div className={styles.previstos}>
                <TextField id="cadastrar-data"
                    className={styles.input__pequeno}
                    label="Data Prevista" />
                <TextField id="cadastrar-ganho"
                    className={styles.input__pequeno}
                    label="Ganho Previsto" />
            </div>
            <TextField id="cadastrar-solicitante"
                className={styles.input}
                label="Solicitado por" />
            <Button texto='Cadastrar Projeto' cor='verde' />
        </div>
    )
}