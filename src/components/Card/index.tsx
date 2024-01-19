import styles from './Card.module.scss'
import UserIMG from 'assets/imagem_usuario.png'
import classNames from 'classnames'
import dayjs from 'dayjs'

interface Props {
    nome: string,
    projeto: string,
    status: string,
    imagem?: string,
    dataProgramado?: string
    onClick?: (_: any) => any
}

export default function Card(props: Props) {
    return (
        <div className={styles.container} onClick={props.onClick} aria-label={props.dataProgramado && `Programado para ${dayjs(props.dataProgramado).format('DD/MM/YYYY')}`}>
            <img src={props.imagem ? props.imagem : UserIMG} alt='Imagem de usuário' />
            <div className={styles.container__right}>
                <p style={{ fontWeight: 'bold' }}>{props.nome}</p>
                <p>{props.projeto}</p>
                <p className={classNames(
                    styles.status,
                    styles[`status--${props.status.replace(' ', '_').toLowerCase()}`]
                )}>{props.status}</p>
            </div>
        </div>
    )
}