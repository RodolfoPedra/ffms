import React from 'react';
import { GlobalContext } from './useContext/GlobalContext';

const tableHead = [
  'Posição',
  '',
  '',
  'PTS',
  'J',
  'V',
  'E',
  'D',
  'GP',
  'GC',
  'SG',
  'CA',
  'VA',
  '%',
];

const TabelaClassificacao = ({ idFase, idGrupo }) => {
  const dadosGlobais = React.useContext(GlobalContext);
  const [classificacao, setClassificacao] = React.useState(null);

  function unique(json) {
    const dadosTemp = Array.from(new Set(json.map((i) => i.CodTime))).map(
      (ct) => {
        return json.find((i) => i.CodTime === ct);
      },
    );
    const dados = json.filter((i) => i.rodada == dadosTemp.length);
    setClassificacao(dados);
  }

  function getClassificacaoFase() {
    const url = `${dadosGlobais.baseUrl}ClassificacaoCampeonatoGrupo/${idFase}/${idGrupo}`;
    fetch(url, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then((response) => response.json())
      .then((json) => unique(json));
  }

  React.useEffect(() => {
    getClassificacaoFase();
  }, [idFase]);

  if (classificacao === null) return null;
  return (
    <table className="table ">
      <thead className="tableHead">
        <tr>
          {tableHead.map((th, index) => (
            <th key={index}>{th}</th>
          ))}
        </tr>
      </thead>
      <tbody className="tableBody">
        {classificacao.map((item, index) => (
          <tr key={index}>
            <td>{item.posicao}</td>
            <td>
              <img
                className="brasaoRodada"
                src={`http://futebolms.com.br/v5/wp-content/uploads/api/escudos/serieA/${item.CodTime}.png`}
                alt=""
              />
            </td>
            <td>{item.NomTime}</td>
            <td>{item.PG}</td>
            <td>{item.Partidas}</td>
            <td>{item.VIT}</td>
            <td>{item.EMP}</td>
            <td>{item.DER}</td>
            <td>{item.GP}</td>
            <td>{item.GC}</td>
            <td>{item.SG}</td>
            <td>{item.CA}</td>
            <td>{item.CV}</td>
            <td>{item.PERC}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabelaClassificacao;
