import Card from "components/Card";
import styles from './CardsView.module.scss'
import { useNavigate } from "react-router-dom";
import { Trabalho_Interface } from "types/trabalho";
import { useState } from "react";

interface Props {
    trabalhos: Trabalho_Interface[]
}

export default function CardsView({ trabalhos }: Props) {
    const navigate = useNavigate()
    const [infoCards, setInfoCards] = useState({
        nao_iniciado: trabalhos.filter(trabalho => trabalho.status === 'Não Iniciado'),
        em_andamento: trabalhos.filter(trabalho => trabalho.status === 'Em Andamento'),
        concluido: trabalhos.filter(trabalho => trabalho.status === 'Concluído'),
        parado: trabalhos.filter(trabalho => trabalho.status === 'Parado'),
        cancelado: trabalhos.filter(trabalho => trabalho.status === 'Cancelado'),
    })
    return (
        <div className={styles.container}>
            <div className={styles.cards}>
                <p className={styles.text_title__nao_iniciado}>Não Iniciado</p>
                {infoCards.nao_iniciado.map(trabalho => (
                    <Card key={trabalho.id}
                        nome={trabalho.analista}
                        status={trabalho.status}
                        projeto={trabalho.projeto}
                        onClick={() => navigate(`/Projeto/${trabalho.id}`)} />
                ))}
            </div>
            <div className={styles.cards}>
                <p className={styles.text_title__andamento}>Em Andamento</p>
                {infoCards.em_andamento.map(trabalho => (
                    <Card key={trabalho.id}
                        nome={trabalho.analista}
                        status={trabalho.status}
                        projeto={trabalho.projeto}
                        onClick={() => navigate(`/Projeto/${trabalho.id}`)} />
                ))}
            </div>
            <div className={styles.cards}>
                <p className={styles.text_title__concluido}>Concluído</p>
                {infoCards.concluido.map(trabalho => (
                    <Card key={trabalho.id}
                        nome={trabalho.analista}
                        status={trabalho.status}
                        projeto={trabalho.projeto}
                        onClick={() => navigate(`/Projeto/${trabalho.id}`)} />
                ))}
            </div>
            <div className={styles.cards}>
                <p className={styles.text_title__parado}>Parado</p>
                {infoCards.parado.map(trabalho => (
                    <Card key={trabalho.id}
                        nome={trabalho.analista}
                        status={trabalho.status}
                        projeto={trabalho.projeto}
                        onClick={() => navigate(`/Projeto/${trabalho.id}`)} />
                ))}
            </div>
            <div className={styles.cards}>
                <p className={styles.text_title__cancelado}>Cancelado</p>
                {infoCards.cancelado.map(trabalho => (
                    <Card key={trabalho.id}
                        nome={trabalho.analista}
                        status={trabalho.status}
                        projeto={trabalho.projeto}
                        onClick={() => navigate(`/Projeto/${trabalho.id}`)} />
                ))}
            </div>
        </div>
    )
}