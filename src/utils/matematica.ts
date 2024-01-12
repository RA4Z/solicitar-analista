import { Trabalho_Interface } from "types/trabalho";

export function calcularSomaTotal(trabalho: Trabalho_Interface) {
    let somaTotal = 0;

    trabalho.observacoes.forEach((obs) => {
        somaTotal += obs.tempoMinutos;
    });

    return somaTotal;
}