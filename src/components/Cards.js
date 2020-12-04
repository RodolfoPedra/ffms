import React from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from './useContext/GlobalContext';

const Cards = () => {
  const dadosGlobais = React.useContext(GlobalContext);
  const [competicoes, setCompeticoes] = React.useState(null);

  function seriesCampeonatos() {
    const url = `${dadosGlobais.baseUrl}Campeonatos`;
    fetch(url, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then((response) => response.json())
      .then((result) => setCompeticoes(result));
  }

  React.useEffect(() => {
    if (dadosGlobais.baseUrl) {
      seriesCampeonatos();
    }
  }, [dadosGlobais]);

  if (dadosGlobais === null) return null;
  return (
    <div className="cards">
      {competicoes &&
        competicoes.map((v, k) =>
          v.codigo_campeonato !== 373 ? (
            <div className="clr-col-3" key={v.Campeonato_Nome}>
              <Link
                to={`classificacao/${v.Campeonato_Nome}/${v.codigo_campeonato}`}
                className="card clickable"
              >
                <div className="card-img">
                  <img
                    src={`http://futebolms.com.br/v5/wp-content/uploads/api/campeonatos/2020/${v.codigo_campeonato}.png`}
                  />
                </div>
                <div className="card-block">
                  <p className="card-text">{v.Campeonato_Nome}</p>
                </div>
              </Link>
            </div>
          ) : null,
        )}
    </div>
  );
};

export default Cards;
