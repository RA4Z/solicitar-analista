import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import styles from './Selecionar.module.scss'

interface Props {
    dados: any
    setDados: (_: any) => any
}

export function Analista(props: Props) {
    return (
        <>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Analista Responsável</InputLabel>
                <Select
                    id="demo-simple-select"
                    value={props.dados.analista}
                    className={styles.input}
                    onChange={e => props.setDados({ ...props.dados, analista: e.target.value })}>
                    <MenuItem value={'Alisson'} style={{ fontWeight: 'bold' }}>Alisson</MenuItem>
                    <MenuItem value={'Anderson'} style={{ fontWeight: 'bold' }}>Anderson</MenuItem>
                    <MenuItem value={'Daniel'} style={{ fontWeight: 'bold' }}>Daniel</MenuItem>
                    <MenuItem value={'Fabiana'} style={{ fontWeight: 'bold' }}>Fabiana</MenuItem>
                    <MenuItem value={'Karoline'} style={{ fontWeight: 'bold' }}>Karoline</MenuItem>
                    <MenuItem value={'Rogério'} style={{ fontWeight: 'bold' }}>Rogério</MenuItem>
                    <MenuItem value={'Rohan'} style={{ fontWeight: 'bold' }}>Rohan</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}

export function Solicitante(props: Props) {
    return (
        <>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Solicitado por</InputLabel>
                <Select
                    id="demo-simple-select"
                    value={props.dados.solicitante}
                    className={styles.input}
                    onChange={e => props.setDados({ ...props.dados, solicitante: e.target.value })}>
                    <MenuItem value={'Thiago Nicolau Fortunato'} style={{ fontWeight: 'bold' }}>Thiago Nicolau Fortunato</MenuItem>
                    <MenuItem value={'Valmir Junckes'} style={{ fontWeight: 'bold' }}>Valmir Junckes</MenuItem>
                    <MenuItem value={'Amanda Nolasco Silverio'} style={{ fontWeight: 'bold' }}>Amanda Nolasco Silverio</MenuItem>
                    <MenuItem value={'Juliano Krueger'} style={{ fontWeight: 'bold' }}>Juliano Krueger</MenuItem>
                    <MenuItem value={'Filial'} style={{ fontWeight: 'bold' }}>Filial</MenuItem>
                    <MenuItem value={'Outros'} style={{ fontWeight: 'bold' }}>Outros</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}