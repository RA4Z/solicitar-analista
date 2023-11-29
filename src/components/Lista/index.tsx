interface Props {
    titulo: string,
    analista: string,
    solicitante: string,
    dataProgramada: string,
    dataFimReal: string,
    ganhoPrevisto: string,
    ganhoReal: string,
    status: string
}

export default function Lista(props: Props) {
    return (
        <div>
            Lista
        </div>
    )
}