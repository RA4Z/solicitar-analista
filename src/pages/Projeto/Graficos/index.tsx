import classNames from 'classnames';
import dayjs from 'dayjs';
import styles from './Graficos.module.scss'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface Props {
  observacoes: { data: string; ocorrido: string; horaInicio: string; horaFim: string; tempoMinutos: number }[];
  status: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const date = label;
    const minutes = payload[0].value;
    return (
      <div style={{ backgroundColor: '#0C2D48', padding: '5px', border: '1px solid #ccc' }}>
        <p>Data: {dayjs(date).format('DD/MM/YYYY')}</p>
        <p>Tempo em minutos: {minutes}</p>
      </div>
    );
  }
  return null;
};

export default function Graficos({ observacoes, status }: Props) {
  const observer = observacoes.sort((a, b) => (dayjs(a.data) < dayjs(b.data) ? -1 : 1));
  return (
    <BarChart width={600} height={400} data={observer}>
      <CartesianGrid strokeDasharray="2 2" />
      <XAxis dataKey="data" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Bar
        dataKey="tempoMinutos"
        name="Tempo em Minutos"
        barSize={30}
        radius={[5, 5, 0, 0]}
        className={classNames(
            styles.status,
            styles[`status--${status.replace(' ', '_').toLowerCase()}`]
        )}
      />
    </BarChart>
  );
}
