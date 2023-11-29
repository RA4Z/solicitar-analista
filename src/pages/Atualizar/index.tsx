import { TextField, FormControl, MenuItem, InputLabel, Select } from '@mui/material'
import { useState } from 'react'
import styles from './Atualizar.module.scss'
import Button from 'components/Button'
import { useNavigate, useParams } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar';
import { atualizarProjeto, deletarProjeto, infoProjeto } from 'services/firestore';
import classNames from 'classnames'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Atualizar() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [acesso, setAcesso] = useState(false)
    const [erroSubmit, setErroSubmit] = useState(false)
    const [dados, setDados] = useState({
        analista: '',
        dataFimReal: '',
        dataPrevista: '',
        descricao: '',
        ganhoPrevisto: '',
        ganhoReal: '',
        observacoes: [{ data: '', ocorrido: '' }],
        projeto: '',
        solicitante: '',
        status: 'Não Iniciado'
    })
    const [obs, setObs] = useState({ data: '', ocorrido: '' })
    const [statusToast, setStatusToast] = useState({
        visivel: false,
        message: ''
    })

    if (dados.analista === '' && acesso === false) {
        infoProjeto(id, setDados)
        setAcesso(true)
    }

    function timeout(delay: number) {
        return new Promise(res => setTimeout(res, delay));
    }

    async function realizarCadastro() {
        if (dados.projeto === '' || dados.analista === '' || dados.descricao === '' || dados.dataPrevista === '' || dados.ganhoPrevisto === '' || dados.solicitante === '') {
            setStatusToast({ visivel: true, message: 'Existem dados em branco' })
            setErroSubmit(true)
            return
        }
        const response = await atualizarProjeto(id, dados)
        if (response === 'error') {
            setStatusToast({ visivel: true, message: 'Ocorreu algum erro na hora de gravar a solicitação, solicite suporte!' })
            return
        }
        setStatusToast({ visivel: true, message: 'O trabalho foi atualizado com sucesso!' })
        await timeout(2000);
        navigate(-1)
    }

    function adicionarObs() {
        if (obs.data && obs.ocorrido) {
            dados.observacoes.push({ data: obs.data, ocorrido: obs.ocorrido })
            setObs({ data: '', ocorrido: '' })
            setStatusToast({ visivel: true, message: 'Observação Adicionada!' })
        }
    }

    async function apagarProjeto() {
        const response = await deletarProjeto(id)
        if (response === 'error') {
            setStatusToast({ visivel: true, message: 'Ocorreu algum erro na hora de deletar o projeto, solicite suporte!' })
            return
        }
        setOpen(false)
        setStatusToast({ visivel: true, message: 'Projeto deletado com sucesso!' })
        await timeout(2000);
        navigate('/')
    }

    return (
        <div className={styles.container}>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {"Tem certeza de que deseja excluir esse projeto?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Essa ação é irreversível, o projeto "{dados.projeto}" do analista {dados.analista} será deletado para sempre!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button texto='Cancelar' cor='cinza' onClick={() => setOpen(false)} />
                    <Button texto='Deletar Projeto' cor='vermelho' onClick={() => apagarProjeto()} />
                </DialogActions>
            </Dialog>

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

            <div className={styles.previstos}>
                <TextField id="cadastrar-data-fim"
                    className={styles.input__pequeno}
                    value={dados.dataFimReal}
                    error={erroSubmit}
                    onChange={e => setDados({ ...dados, dataFimReal: e.target.value })}
                    label="Finalizado em" />
                <TextField id="cadastrar-ganho-real"
                    className={styles.input__pequeno}
                    value={dados.ganhoReal}
                    error={erroSubmit}
                    onChange={e => setDados({ ...dados, ganhoReal: e.target.value })}
                    label="Ganho Previsto" />
            </div>

            <TextField id="cadastrar-solicitante"
                className={styles.input}
                error={erroSubmit}
                value={dados.solicitante}
                onChange={e => setDados({ ...dados, solicitante: e.target.value })}
                label="Solicitado por" />

            <FormControl>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                    id="demo-simple-select"
                    value={dados.status}
                    className={classNames(
                        styles.status_projeto,
                        styles[`status_projeto--${dados.status.replace(' ', '_').toLowerCase()}`]
                    )}
                    onChange={e => setDados({ ...dados, status: e.target.value })}>
                    <MenuItem value={'Não Iniciado'} style={{ color: '#6C6B6B', fontWeight: 'bold' }}>Não Iniciado</MenuItem>
                    <MenuItem value={'Em Andamento'} style={{ color: '#5590EA', fontWeight: 'bold' }}>Em Andamento</MenuItem>
                    <MenuItem value={'Concluído'} style={{ color: '#369227', fontWeight: 'bold' }}>Concluído</MenuItem>
                    <MenuItem value={'Parado'} style={{ color: '#BAB310', fontWeight: 'bold' }}>Parado</MenuItem>
                    <MenuItem value={'Cancelado'} style={{ color: '#9D1010', fontWeight: 'bold' }}>Cancelado</MenuItem>
                </Select>
            </FormControl>

            <div className={styles.obs}>
                <TextField id="atualizar-data-obs"
                    className={styles.input__pequeno}
                    value={obs.data}
                    error={erroSubmit}
                    onChange={e => setObs({ ...obs, data: e.target.value })}
                    label="Data de observação" />

                <TextField id="atualizar-text-obs"
                    rows={4}
                    multiline
                    className={styles.input__description}
                    value={obs.ocorrido}
                    error={erroSubmit}
                    onChange={e => setObs({ ...obs, ocorrido: e.target.value })}
                    label="Texto da Observação" />
                <Button texto='Adicionar Observação' cor='azul' onClick={() => adicionarObs()} />
            </div>

            <div className={styles.buttons}>
                <Button texto='Cancelar' cor='cinza' onClick={() => navigate(-1)} />
                <Button texto='Salvar Alterações' cor='verde' onClick={() => realizarCadastro()} />
                <Button texto='Deletar Projeto' cor='vermelho' onClick={() => setOpen(true)} />
            </div>
            <Snackbar
                open={statusToast.visivel}
                onClose={() => setStatusToast({ ...statusToast, visivel: false })}
                autoHideDuration={3000}
                message={statusToast.message} />
        </div>
    )
}