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
  });

  const baseUrl = 'http://servicos-fdrs.cbf.com.br/api/Schemafdrs/';
  const auth =
    'Basic bXMucmVnaXN0cm9AY2JmLmNvbS5icjpGbWF0b2dyb3Nzb2Rvc3VsIzIwMTUxMTEwIw==';
  const [alteracoesJogos, setAlteracoesJogos] = React.useState(null);
  const [campeonatosNomes, setCampeonatosNomes] = React.useState(null);

  function getAlteracoesJogos() {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const url = `${baseUrl}AlteracoesJogos`;
    fetch(proxyurl + url, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `${auth}`,
      },
    })
      .then((response) => response.json())
      .then((json) => setAlteracoesJogos(json));
  }

  function campeonatos() {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const url = `${baseUrl}Campeonatos`;
    fetch(proxyurl + url, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `${auth}`,
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
      value={{ baseUrl, auth, alteracoesJogos, abrevTimes, campeonatosNomes }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
