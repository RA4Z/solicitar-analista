import Button from 'components/Button'
import styles from './Visualizar.module.scss'
import { TextField, Checkbox, FormControlLabel, Divider } from '@mui/material'

export default function Visualizar() {

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
                <Divider style={{ background: 'white', width: '100%', }} />
            </form>
        </div>
    )
}