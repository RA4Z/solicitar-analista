import styles from './Visualizar.module.scss'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Checkbox, FormControlLabel, Divider } from '@mui/material'
import Card from 'components/Card'
import { visualizarSolicitacoes } from 'services/firestore'
import Lista from 'components/Lista'

export default function Visualizar({ view }: any) {
    const [filtros, setFiltros] = useState({
        projeto: '', analista: ''
    })
    const [filtroStatus, setFiltroStatus] = useState({ concluido: false, andamento: false, nao_iniciado: false, parado: false, cancelado: false })
    const [trabalhos, setTrabalhos] = useState([{
        id: '',
        analista: '',
        projeto: '',
        status: '',
        solicitante: '',
        dataPrevista: '',
        dataFimReal: '',
        ganhoPrevisto: '',
        ganhoReal: ''
    }])

    const [backupFiltro, setBackupFiltro] = useState(trabalhos)

    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        async function buscarDados() {
            await visualizarSolicitacoes(setTrabalhos, setBackupFiltro)
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
        function testaStatus(lista: any, novaLista: typeof trabalhos) {
            let list = novaLista
            if (lista.includes('Concluído')) list = novaLista.filter(item => item.status === 'Concluído')
            if (lista.includes('Em Andamento')) list = novaLista.filter(item => item.status === 'Em Andamento')
            if (lista.includes('Parado')) list = novaLista.filter(item => item.status === 'Parado')
            if (lista.includes('Cancelado')) list = novaLista.filter(item => item.status === 'Cancelado')
            if (lista.includes('Não Iniciado')) list = novaLista.filter(item => item.status === 'Não Iniciado')
            return list
        }
        let lista = []
        if (filtroStatus.concluido) lista.push('Concluído')
        if (filtroStatus.andamento) lista.push('Em Andamento')
        if (filtroStatus.parado) lista.push('Parado')
        if (filtroStatus.cancelado) lista.push('Cancelado')
        if (filtroStatus.nao_iniciado) lista.push('Não Iniciado')
        console.log(lista)
        let novaLista = backupFiltro.filter(item => testaProjeto(item.projeto) && testaAnalista(item.analista))
        novaLista = testaStatus(lista, novaLista)
        setTrabalhos(novaLista)
    }, [filtros, filtroStatus, backupFiltro])

    return (
        <div className={styles.container}>
            <form>
                <div className={styles.pesquisas}>
                    <div className={styles.pesquisas__left}>
                        <TextField id="cadastrar-projeto"
                            className={styles.input}
                            value={filtros.projeto}
                            onChange={e => setFiltros({ ...filtros, projeto: e.target.value })}
                            label="Filtrar por Título do Projeto" />
                        <TextField id="cadastrar-analista"
                            className={styles.input}
                            value={filtros.analista}
                            onChange={e => setFiltros({ ...filtros, analista: e.target.value })}
                            label="Filtrar por Nome de Analista" />
                    </div>
                    <div className={styles.pesquisas__right}>
                        <FormControlLabel control={<Checkbox onChange={e => setFiltroStatus({ ...filtroStatus, concluido: e.target.checked })} />} label={<div className={styles.check__concluido}>Concluído</div>} />
                        <FormControlLabel control={<Checkbox onChange={e => setFiltroStatus({ ...filtroStatus, andamento: e.target.checked })} />} label={<div className={styles.check__andamento}>Em Andamento</div>} />
                        <FormControlLabel control={<Checkbox onChange={e => setFiltroStatus({ ...filtroStatus, nao_iniciado: e.target.checked })} />} label={<div className={styles.check__nao_iniciado}>Não Iniciado</div>} />
                        <FormControlLabel control={<Checkbox onChange={e => setFiltroStatus({ ...filtroStatus, parado: e.target.checked })} />} label={<div className={styles.check__parado}>Parado</div>} />
                        <FormControlLabel control={<Checkbox onChange={e => setFiltroStatus({ ...filtroStatus, cancelado: e.target.checked })} />} label={<div className={styles.check__cancelado}>Cancelado</div>} />
                    </div>
                </div>
                {/* <div className={styles.submit}>
                    <Button texto='Pesquisar' cor='azul' onClick={() => {}} />
                </div> */}
                <Divider style={{ background: 'white', width: '100%', marginBottom: 25, marginTop: 20 }} />
            </form>
            {view === 'cards' ? <div className={styles.cards}>
                {trabalhos.map(trabalho => (
                    <Card key={trabalho.id}
                        nome={trabalho.analista}
                        status={trabalho.status}
                        projeto={trabalho.projeto}
                        onClick={() => navigate(`/Projeto/${trabalho.id}`)} />
                ))}
            </div> :
                <>
                    {trabalhos.map(trabalho => (
                        <Lista key={trabalho.id} {...trabalho} onClick={() => navigate(`/Projeto/${trabalho.id}`)} />
                    ))}
                </>}
        </div >
    )
}