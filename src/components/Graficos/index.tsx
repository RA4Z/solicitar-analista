import { Dialog, DialogContent } from "@mui/material";
import { Trabalho_Interface } from "types/trabalho";

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
                        <h3>{trabalho.projeto}</h3>
                        {trabalho.observacoes.map(obs => (<p>{obs.ocorrido} - {obs.tempoMinutos}</p>))}
                    </div>
                ))}
            </DialogContent>
        </Dialog>
    )
}