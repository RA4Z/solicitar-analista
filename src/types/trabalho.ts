export interface Trabalho_Interface {
    id: any,
    analista: string,
    projeto: string,
    status: string,
    solicitante: string,
    dataPrevista: string,
    dataFimReal: string,
    ganhoPrevisto: string,
    ganhoReal: string,
    observacoes: { data: string, ocorrido: string, horaInicio: string, horaFim: string, tempoMinutos: number }[]
}