import { TextField } from '@mui/material'
import { useState } from 'react'
import styles from './Cadastrar.module.scss'
import Button from 'components/Button'
import { useNavigate } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar';
import { salvarSolicitacao } from 'services/firestore';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'
import { Analista, Solicitante } from 'components/Selecionar'

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
        status: 'Não Iniciado',
        observacoes: []
    })

    const [statusToast, setStatusToast] = useState({
        visivel: false,
        message: ''
    })

    function timeout(delay: number) {
        return new Promise(res => setTimeout(res, delay));
    }

    async function realizarCadastro() {
        if (!dayjs(dados.dataPrevista).isValid()) {
            setStatusToast({ visivel: true, message: 'A data prevista está inválida!' })
            return
        }
        if (dados.projeto === '' || dados.analista === '' || dados.descricao === '' || dados.ganhoPrevisto === '' || dados.solicitante === '') {
            setStatusToast({ visivel: true, message: 'Existem dados em branco' })
            setErroSubmit(true)
            return
        }
        const response = await salvarSolicitacao(dados)
        if (response === 'erro') {
            setStatusToast({ visivel: true, message: 'Ocorreu algum erro na hora de gravar a solicitação, solicite suporte' })
            return
        }
        setStatusToast({ visivel: true, message: 'O trabalho foi solicitado com sucesso!' })
        await timeout(2000);
        navigate('/')
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

                <Analista dados={dados} setDados={setDados} />
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

                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker label='Data Prevista'
                        format='DD/MM/YYYY'
                        value={dados.dataPrevista !== '' ? dayjs(dados.dataPrevista) : null}
                        onChange={e => setDados({ ...dados, dataPrevista: (dayjs(e).format('YYYY-MM-DD').toString()) })}
                        className={styles.input__pequeno} />
                </LocalizationProvider>

                <TextField id="cadastrar-ganho"
                    className={styles.input__pequeno}
                    value={dados.ganhoPrevisto}
                    error={erroSubmit}
                    onChange={e => setDados({ ...dados, ganhoPrevisto: e.target.value })}
                    label="Ganho Previsto" />
            </div>
            <Solicitante dados={dados} setDados={setDados} />

            <Button texto='Cadastrar Projeto' cor='verde' onClick={() => realizarCadastro()} />
            <Snackbar
                open={statusToast.visivel}
                onClose={() => setStatusToast({ ...statusToast, visivel: false })}
                autoHideDuration={3000}
                message={statusToast.message}
            />
        </div>
    )
}