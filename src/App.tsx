import React, { useEffect, useState, useCallback } from "react";
import { uuid } from "uuidv4";
import { api } from "./services/api";

interface IData {
  id: string;
  name: string;
  price: number;
}

const App: React.FC = () => {
  const [data, setData] = useState<IData[]>([]);
  const [fruta, setFruta] = useState<string>("");
  const [frutaValue, setFrutaValue] = useState<any>();

  useEffect(() => {
    console.log(fruta);
    api.get("data").then((response) => {
      setData(response.data);
    });
  }, [fruta]);

  const convertoToCurrency = useCallback((value: number) => {
    return Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }, []);

  const addToApi = useCallback(() => {
    api
      .post("data", {
        id: uuid,
        name: fruta,
        price: frutaValue,
      })
      .then((response) => alert("Tudo certo"))
      .catch((e) => alert("error"));
  }, [uuid, fruta, frutaValue]);

  return (
    <div>
      <h1>Hello</h1>
      <ul>
        {data.map((frut) => (
          <li key={frut.id}>
            {frut.name} | {convertoToCurrency(frut.price)}
          </li>
        ))}
      </ul>
      <hr />
      <h1>{fruta}</h1>
      <hr />
      <input
        type="text"
        onChange={(e) => setFruta(e.target.value)}
        placeholder="Qual fruta é"
      />
      <input
        type="number"
        onChange={(e) => setFrutaValue(parseFloat(e.target.value))}
        placeholder="valor"
      />

      <button onClick={addToApi}>Adicionar</button>
    </div>
  );
};

export default App;

/// fire code

//rfc
