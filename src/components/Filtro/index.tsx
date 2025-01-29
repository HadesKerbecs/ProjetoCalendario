import React, { useState } from 'react';
import style from './Filtro.module.scss';
import { useSetRecoilState } from 'recoil';
import { IFiltroDeEventos } from '../../interfaces/IFiltroDeEventos';
import { filtroDeEventos } from '../../state/atom';

const Filtro: React.FC = () => {
  
  const [data, setData] = useState('')
  const [status, setStatus] = useState<'completos' | 'incompletos' | 'ambos' | ''>('');
  const setFiltroDeEvento = useSetRecoilState<IFiltroDeEventos>(filtroDeEventos)
  
  const submeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    const filtro: IFiltroDeEventos = {
      data: data ? new Date(data) : null,
      status: status || 'ambos',
    }
    setFiltroDeEvento(filtro);
  }

  return (<form className={style.Filtro} onSubmit={submeterForm}>
    <h3 className={style.titulo}>Filtrar por data e status</h3>
    <input 
      type="date" 
      name="data"
      className={style.input}
      onChange={evento => setData(evento.target.value)} 
      placeholder="Por data"
      value={data}
       />
      <select
      name='status'
      className={style.input}
      onChange={(evento) => setStatus(evento.target.value as 'completos' | 'incompletos' | 'ambos')}
      value={status}
      >
        <option value="" disabled>Selecione um status</option>
        <option value="ambos">Ambos</option>
        <option value="completos">Completos</option>
        <option value="incompletos">Incompletos</option>
      </select>

    <button className={style.botao}>
      Filtrar
    </button>

  </form>)
}

export default Filtro