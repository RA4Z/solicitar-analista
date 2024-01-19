import { Divider, TextField } from '@mui/material'
import styles from './Paralelos.module.scss'
import { useEffect, useState } from 'react'
import { buscarTrabalhosParalelos } from 'services/firestore'
import { Analista } from 'components/Selecionar'
import dayjs from 'dayjs'
import Imprevisto from 'components/Imprevisto'
import Button from 'components/Button'
import { useNavigate } from 'react-router-dom'

export default function Paralelos() {
    const [imprevisto, setImprevisto] = useState(false)
    const [filtros, setFiltros] = useState({ projeto: '', analista: '' })
    const [projetos, setProjetos] = useState([{ analista: '', data: '', horaInicio: '', horaFim: '', ocorrido: '', tempoMinutos: 0 }])
    const [backup, setBackup] = useState([{ analista: '', data: '', horaInicio: '', horaFim: '', ocorrido: '', tempoMinutos: 0 }])

    const navigate = useNavigate()

    useEffect(() => {
        async function buscarDados() {
            await buscarTrabalhosParalelos(setProjetos, setBackup)
        }
        buscarDados()
    }, [])

    useEffect(() => {
        function testaProjeto(title: string) {
            const regex = new RegExp(filtros.projeto, 'i');
            return regex.test(title);
        }
        function testaAnalista(title: string) {
            const regex = new RegExp(filtros.analista, 'i');
            return regex.test(title);
        }
        let novaLista = backup.filter(item => testaProjeto(item.ocorrido) && testaAnalista(item.analista))
        setProjetos(novaLista)
    }, [backup, filtros])
    return (
        <div className={styles.container}>
            <Imprevisto imprevisto={imprevisto} setImprevisto={setImprevisto} />
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
                <Button texto='Visualizar Projetos' cor='azul' onClick={() => navigate('/')} />
                <Button texto='Cadastrar Paralelos' cor='azul claro' onClick={() => setImprevisto(true)} />
            </div>
            <form>
                <div className={styles.pesquisas}>
                    <TextField id="cadastrar-projeto"
                        className={styles.input}
                        value={filtros.projeto}
                        onChange={e => setFiltros({ ...filtros, projeto: e.target.value })}
                        label="Filtrar por Descrição do Projeto Paralelo" />
                    <Analista dados={filtros} setDados={setFiltros} />
                </div>
                <Divider style={{ background: 'white', width: '100%', marginBottom: 25, marginTop: 20 }} />
            </form>

            <div className={styles.paralelos}>
                {projetos.length > 0 ? <>
                    {projetos.map((projeto, index) => (
                        <div className={styles.card} key={index}>
                            <div className={styles.card__front}>
                                <h2>{dayjs(projeto.data).format('DD/MM/YYYY')}</h2>
                                <h3>{dayjs(projeto.horaInicio).format('HH:MM')} - {dayjs(projeto.horaFim).format('HH:MM')} ( {(projeto.tempoMinutos / 60).toFixed(2)}h )</h3>
                            </div>
                            <p>{projeto.analista} - {projeto.ocorrido}</p>
                        </div>
                    ))}
                </> : <h2 style={{ color: 'white', textAlign: 'center' }}>Nenhum projeto paralelo encontrado!</h2>}
            </div>

        </div>
    )
}