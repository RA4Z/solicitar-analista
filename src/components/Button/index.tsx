import styles from './Button.module.scss'

interface Props {
    texto: string,
    cor: string,
    onClick: (_: any) => any
}

export default function Button(props: Props) {
    let color = ''

    if (props.cor) {
        switch (props.cor) {
            case 'verde':
                color = '#369227'
                break;
            case 'vermelho':
                color = '#9D1010'
                break;
            case 'amarelo':
                color = '#BAB310'
                break;
            case 'azul claro':
                color = '#2E8BC0'
                break;
            case 'azul':
                color = '#145DA0'
                break;
            case 'azul-escuro':
                color = '#0C2D48'
                break;
            case 'cinza':
                color = '#6C6B6B'
                break;
        }

    }
    return (
        <div className={styles.container} style={{ background: color }} onClick={props.onClick}>
            {props.texto}
        </div>
    )
}