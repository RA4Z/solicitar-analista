import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import styles from './SelecionarAnalista.module.scss'

interface Props {
    dados: any
    setDados: (_: any) => any
}

export default function SelecionarAnalista(props: Props) {
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