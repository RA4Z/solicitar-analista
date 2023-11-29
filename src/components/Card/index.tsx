import styles from './Card.module.scss'
import UserIMG from 'assets/imagem_usuario.png'

interface Props {
    nome: string,
    projeto: string,
    status: string
    imagem?: string
    onClick?: (_: any) => any
}

export default function Card(props: Props) {
    return (
        <div className={styles.container} onClick={props.onClick}>
            <img src={props.imagem ? props.imagem : UserIMG} alt='Imagem de usuário' />
            <div className={styles.container__right}>
                <p>{props.nome}</p>
                <p>{props.projeto}</p>
                <p>{props.status}</p>
            </div>
        </div>
    )
}