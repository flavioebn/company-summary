import { useEffect, useState } from "react";

const Funds = () => {
  const [entryDescription, setEntryDescription] = useState();
  const [entryValue, setEntryValue] = useState();
  const [totalFunds, setTotalFunds] = useState(0);

  const [data, setData] = useState([[]]);

  useEffect(() => {
    const localData = localStorage.getItem("total-funds");
    if (localData) setData(JSON.parse(localData));
  }, []);

  const saveToStorage = (toSave) => {
    localStorage.setItem("total-funds", JSON.stringify(toSave));
  };

  const handleAdd = () => {
    const tempArray = data;
    const lastDay = data.length - 1;
    tempArray[lastDay].push({
      description: entryDescription,
      value: parseInt(entryValue),
    });
    setData(tempArray);
    saveToStorage(tempArray);
    setEntryDescription("");
    setEntryValue(0);
  };

  const downloadObjectAsJson = () => {
    var dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(data));
    var downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "funds.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const closeDay = () => {
    const total = data[data.length - 1].reduce(
      (accumulator, curValue) => accumulator + curValue.value,
      0
    );
    console.log("total: ", total);
    console.log("pra reserva: ", (total / 100) * 20);
    console.log("pra distribuir: ", (total / 100) * 80);
    const tempArray = data;
    const lastDay = data.length - 1;
    const toFunds = (total / 100) * 20;
    tempArray[lastDay].push({
      description: "Pra reserva",
      value: toFunds,
    });
    tempArray[lastDay].push({
      description: "Distribuição",
      value: -((total / 100) * 80),
    });
    tempArray.push([]);
    setTotalFunds((prev) => prev + toFunds);
    setData(tempArray);
    saveToStorage(tempArray);
    setEntryDescription("");
    setEntryValue();
  };

  return (
    <div>
      <h1>Reserva: {totalFunds}</h1>
      {data.map((i, idx) => {
        return (
          <div key={idx}>
            <h1>Dia {idx + 1}</h1>
            {i.map((j, index) => {
              return (
                <ul key={index}>
                  <li>
                    {j.description}: {j.value}
                  </li>
                </ul>
              );
            })}
          </div>
        );
      })}
      <div>
        <p>Descrição:</p>
        <input
          type="text"
          value={entryDescription}
          onChange={(e) => setEntryDescription(e.target.value)}
        />
        <p>Valor:</p>
        <input
          type="number"
          value={entryValue}
          onChange={(e) => setEntryValue(e.target.value)}
        />
        <button onClick={handleAdd}>Adicionar</button>
      </div>
      <br />
      <button>New entry</button> <br /> <br />
      <button onClick={closeDay}>Fechar o dia</button>
      <br />
      <br />
      <button onClick={downloadObjectAsJson}>backup</button>
    </div>
  );
};

export default Funds;
