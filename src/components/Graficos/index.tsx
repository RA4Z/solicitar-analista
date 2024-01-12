import { Dialog, DialogContent } from "@mui/material";
import { Trabalho_Interface } from "types/trabalho";
import { calcularSomaTotal } from "utils/matematica";

interface Props {
    grafico: any,
    setGrafico: any,
    trabalhos: Trabalho_Interface[]
}

export default function Graficos(props: Props) {
    return (
        <Dialog
            open={props.grafico}
            onClose={() => props.setGrafico(false)}
            style={{ textAlign: 'center' }}>
            <DialogContent>
                {props.trabalhos.map(trabalho => (
                    <div>
                        {calcularSomaTotal(trabalho) > 0 && <h3>{trabalho.projeto} - {(calcularSomaTotal(trabalho) / 60).toFixed(2)}h</h3>}
                    </div>
                ))}
            </DialogContent>
        </Dialog>
    )
}