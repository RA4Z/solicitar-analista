import { Dialog, DialogContent, Snackbar, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "components/Button";

import styles from "./Imprevisto.module.scss"
import dayjs from "dayjs";
import { useState } from "react";
import { Analista } from "components/Selecionar";
import { cadastrarTrabalhoParalelo } from "services/firestore";

interface Props {
    imprevisto: any,
    setImprevisto: any,
}

export default function Imprevisto(props: Props) {
    const [dados, setDados] = useState({ analista: '', data: '', horaInicio: '', horaFim: '', ocorrido: '' })
    const [statusToast, setStatusToast] = useState({
        visivel: false,
        message: ''
    })

    async function adicionarImprevisto() {
        if (dados.analista === '') return setStatusToast({ visivel: true, message: 'O analista não pode estar em branco!' })
        if (dados.data === '') return setStatusToast({ visivel: true, message: 'Insira uma data válida!' })
        if (dados.horaInicio === '' || dados.horaFim === '') return setStatusToast({ visivel: true, message: 'É obrigatório um horário de início e fim!' })
        if (dados.ocorrido === '') return setStatusToast({ visivel: true, message: 'Insira detalhes sobre o trabalho!' })
        if (dayjs(dados.horaInicio) > dayjs(dados.horaFim)) {
            setStatusToast({ visivel: true, message: 'O horário de início não pode ser maior do que o horário de fim!' })
            return
        }
        const tempoMinutos = (dayjs(dados.horaFim).diff(dayjs(dados.horaInicio), 'minutes'))
        const result = await cadastrarTrabalhoParalelo({ ...dados, tempoMinutos })
        if (result) {
            setStatusToast({ visivel: true, message: 'Projeto paralelo cadastrado com sucesso!' })
            setDados({ analista: '', data: '', horaInicio: '', horaFim: '', ocorrido: '' })
        } else {
            setStatusToast({ visivel: true, message: 'Ocorreu algum erro ao tentar cadastrar o projeto! Tente novamente mais tarde!' })
        }
    }

    return (
        <Dialog
            open={props.imprevisto}
            onClose={() => props.setImprevisto(false)}
            style={{ textAlign: 'center' }}>
            <DialogContent>
                <div>
                    <h2>Cadastrar projeto paralelo</h2>
                    <div className={styles.obs}>
                        <Analista dados={dados} setDados={setDados} />
                        <div className={styles.obs__inputTime}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}  >
                                <DatePicker label='Data'
                                    format='DD/MM/YYYY'
                                    value={dados.data !== '' ? dayjs(dados.data) : null}
                                    onChange={e => setDados({ ...dados, data: (dayjs(e).format('YYYY-MM-DD').toString()) })}
                                    className={styles.input__pequeno} />
                                <div className={styles.obs__inputTime__left}>

                                    <TimePicker label="Hora Início"
                                        value={dados.horaInicio !== '' ? dados.horaInicio : null}
                                        onChange={(newValue) => setDados({ ...dados, horaInicio: newValue!.toString() })}
                                        className={styles.input__pequeno} />

                                    <TimePicker label="Hora Fim"
                                        value={dados.horaFim !== '' ? dados.horaFim : null}
                                        onChange={(newValue) => setDados({ ...dados, horaFim: newValue!.toString() })}
                                        className={styles.input__pequeno} />
                                </div>
                            </LocalizationProvider>
                        </div>

                        <TextField id="atualizar-text-obs"
                            rows={4}
                            multiline
                            className={styles.input__description}
                            value={dados.ocorrido}
                            onChange={e => setDados({ ...dados, ocorrido: e.target.value })}
                            label="Texto Descritivo" />
                        <div>
                            <Button texto='Adicionar Projeto' cor='azul' onClick={() => adicionarImprevisto()} />
                        </div>
                    </div>
                </div>
            </DialogContent>
            <Snackbar
                open={statusToast.visivel}
                onClose={() => setStatusToast({ ...statusToast, visivel: false })}
                autoHideDuration={3000}
                message={statusToast.message} />
        </Dialog>
    )
}