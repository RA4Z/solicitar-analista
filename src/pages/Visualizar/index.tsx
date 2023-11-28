import Button from 'components/Button'
import styles from './Visualizar.module.scss'
import { useState, useEffect } from 'react'
import { TextField, Checkbox, FormControlLabel, Divider } from '@mui/material'
import Card from 'components/Card'
import { visualizarSolicitacoes } from 'services/firestore'

export default function Visualizar() {
    const [trabalhos, setTrabalhos] = useState([{ id: '', analista: '', projeto: '', status: '' }])

    useEffect(() => {
        visualizarSolicitacoes(setTrabalhos)
    }, [])

    async function realizarFiltro() {
        console.log('Dados filtrados')
    }
    return (
        <div className={styles.container}>
            <form>
                <div className={styles.pesquisas}>
                    <div className={styles.pesquisas__left}>
                        <TextField id="cadastrar-titulo"
                            className={styles.input}
                            label="Filtrar por Título do Projeto" />
                        <TextField id="cadastrar-titulo"
                            className={styles.input}
                            label="Filtrar por Nome de Analista" />
                    </div>
                    <div className={styles.pesquisas__right}>
                        <FormControlLabel control={<Checkbox />} label={<div className={styles.check__concluido}>Concluído</div>} />
                        <FormControlLabel control={<Checkbox />} label={<div className={styles.check__andamento}>Em andamento</div>} />
                        <FormControlLabel control={<Checkbox />} label={<div className={styles.check__nao_iniciado}>Não iniciado</div>} />
                        <FormControlLabel control={<Checkbox />} label={<div className={styles.check__parado}>Parado</div>} />
                        <FormControlLabel control={<Checkbox />} label={<div className={styles.check__cancelado}>Cancelado</div>} />
                    </div>
                </div>
                <div className={styles.submit}>
                    <Button texto='Pesquisar' cor='azul' onClick={() => realizarFiltro()} />
                </div>
                <Divider style={{ background: 'white', width: '100%', marginBottom: 25, marginTop: 20 }} />
            </form>
            <div className={styles.cards}>

                {trabalhos.map(trabalho => (
                    <Card key={trabalho.id} nome={trabalho.analista} status={trabalho.status} projeto={trabalho.projeto} />
                ))}
            </div>
        </div>
    )
}