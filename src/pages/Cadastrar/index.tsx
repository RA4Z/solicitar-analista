import { TextField } from '@mui/material'
import { useState } from 'react'
import styles from './Cadastrar.module.scss'
import Button from 'components/Button'
import { useNavigate } from 'react-router-dom'
import { salvarSolicitacao } from 'services/firestore'

export default function Cadastrar() {
    const navigate = useNavigate()
    const [erroSubmit, setErroSubmit] = useState(false)
    const [dados, setDados] = useState({
        projeto: '',
        analista: '',
        descricao: '',
        dataPrevista: '',
        ganhoPrevisto: '',
        solicitante: '',
        dataFimReal: '',
        ganhoReal: '',
        observacoes: []
    })

    async function realizarCadastro() {
        if (dados.projeto === '' || dados.analista === '' || dados.descricao === '' || dados.dataPrevista === '' || dados.ganhoPrevisto === '' || dados.solicitante === '') {
            alert('Existem dados em branco!')
            setErroSubmit(true)
        } else {
            const response = await salvarSolicitacao(dados)
            if (response === 'erro') {
                alert('Ocorreu algum erro na hora de gravar a solicitação, solicite suporte!')
                return
            }
            alert('Solicitação cadastrada com sucesso!')
            navigate('/')
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Solicitar trabalho para um analista</h1>
            <div className={styles.linhaStart}>

                <TextField id="cadastrar-titulo"
                    className={styles.input}
                    value={dados.projeto}
                    error={erroSubmit}
                    onChange={e => setDados({ ...dados, projeto: e.target.value })}
                    label="Título do Projeto" />

                <TextField id="cadastrar-analista"
                    className={styles.input}
                    value={dados.analista}
                    error={erroSubmit}
                    onChange={e => setDados({ ...dados, analista: e.target.value })}
                    label="Analista Responsável" />
            </div>
            <TextField id="cadastrar-descricao"
                rows={7}
                multiline
                className={styles.input__description}
                value={dados.descricao}
                error={erroSubmit}
                onChange={e => setDados({ ...dados, descricao: e.target.value })}
                label="Descrição do projeto" />

            <div className={styles.previstos}>
                <TextField id="cadastrar-data"
                    className={styles.input__pequeno}
                    value={dados.dataPrevista}
                    error={erroSubmit}
                    onChange={e => setDados({ ...dados, dataPrevista: e.target.value })}
                    label="Data Prevista" />

                <TextField id="cadastrar-ganho"
                    className={styles.input__pequeno}
                    value={dados.ganhoPrevisto}
                    error={erroSubmit}
                    onChange={e => setDados({ ...dados, ganhoPrevisto: e.target.value })}
                    label="Ganho Previsto" />
            </div>
            <TextField id="cadastrar-solicitante"
                className={styles.input}
                error={erroSubmit}
                value={dados.solicitante}
                onChange={e => setDados({ ...dados, solicitante: e.target.value })}
                label="Solicitado por" />

            <Button texto='Cadastrar Projeto' cor='verde' onClick={() => realizarCadastro()} />
        </div>
    )
}