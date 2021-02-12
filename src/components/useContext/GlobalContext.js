import React from 'react';

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const [abrevTimes, setAbrevTimes] = React.useState({
    20051: 'ECC',
    21944: 'AFC',
    35021: 'CREC',
    20041: 'OFC',
    20953: 'SEP',
    20802: 'SERC',
    21757: 'ECAN',
    35020: 'CFC',
    34982: 'CENA',
    35034: 'MAC',
    35016: 'CEU',
    58827: 'DAC',
    21742: 'CAC',
    34990: 'NOVO',
    58035: 'TRÊS SC',
  });

  const baseUrl = 'http://deployme-com-br.umbler.net/cbf/';
  const [alteracoesJogos, setAlteracoesJogos] = React.useState(null);
  const [campeonatosNomes, setCampeonatosNomes] = React.useState(null);

  function getAlteracoesJogos() {
    const url = `${baseUrl}AlteracoesJogos`;
    fetch(url, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then((response) => response.json())
      .then((json) => setAlteracoesJogos(json));
  }

  function campeonatos() {
    const url = `${baseUrl}Campeonatos`;
    fetch(url, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then((response) => response.json())
      .then((result) => setCampeonatosNomes(result));
  }

  React.useEffect(() => {
    getAlteracoesJogos();
    campeonatos();
  }, []);

  return (
    <GlobalContext.Provider
      value={{ baseUrl, alteracoesJogos, abrevTimes, campeonatosNomes }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
