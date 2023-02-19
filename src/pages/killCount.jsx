import { useEffect, useState } from "react";

// const getMonsters = async () => {
//   const monsters = await fetch(
//     "https://www.dnd5eapi.co/api/monsters"
//   ).then((res) => res.json());
//   console.log(monsters.results);
//   monsters.results.map((i) => {
//     getCR(i);
//   });
//   console.log(monsters);
//   localStorage.setItem("monsters", JSON.stringify(monstersList));
// };

// const monstersList = [];

// const getCR = async (monster) => {
//   const cr = await fetch(`https://www.dnd5eapi.co${monster.url}`).then((res) =>
//     res.json()
//   );
//   monstersList.push({ name: cr.name, cr: cr.challenge_rating, xp: cr.xp });
//   console.log(cr);
// };

const KillCount = () => {
  const [data, setData] = useState([
    { player: "Caio", count: 0, killList: [] },
    { player: "Flávio", count: 0, killList: [] },
    { player: "Pedro", count: 0, killList: [] },
    { player: "Perosa", count: 0, killList: [] },
    { player: "Vinícius", count: 0, killList: [] },
  ]);
  const [playerIdx, setPlayerIdx] = useState(0);
  const [count, setCount] = useState(0);
  const [monsterToAdd, setMonsterToAdd] = useState("");

  //   useEffect(() => {
  //     getMonsters();
  //   }, []);

  useEffect(() => {
    const localData = localStorage.getItem("total-kills");
    if (localData) setData(JSON.parse(localData));
  }, []);

  const downloadObjectAsJson = () => {
    var dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(data));
    var downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "kill-count.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const addKill = () => {
    if (monsterToAdd === "") return;
    let tempData = data;
    let killList = tempData[playerIdx].killList;
    const idxToEdit = killList.findIndex(
      (i) => i.monster.toLowerCase() === monsterToAdd.toLowerCase()
    );
    if (idxToEdit === -1) {
      killList.push({ monster: monsterToAdd, quantity: 1 });
    } else {
      killList[idxToEdit].quantity++;
    }
    tempData[playerIdx].count++;
    killList.sort((a, b) => a.monster.localeCompare(b.monster));
    setData(tempData);
    localStorage.setItem("total-kills", JSON.stringify(tempData));
    setCount(count + 1);
  };

  return (
    <div>
      {data.map((i, idx) => {
        return (
          <h1 key={idx} onClick={() => setPlayerIdx(idx)}>
            {i.player}: {i.count}
          </h1>
        );
      })}
      <button onClick={downloadObjectAsJson}>backup</button>

      <h2>Adicionar kill</h2>
      <select onChange={(e) => setPlayerIdx(parseInt(e.target.value))}>
        {data.map((i, idx) => {
          return (
            <option key={idx} value={idx}>
              {i.player}
            </option>
          );
        })}
      </select>
      <p>Matou um:</p>
      <input
        type="text"
        value={monsterToAdd}
        onChange={(e) => setMonsterToAdd(e.target.value)}
      />
      <button onClick={addKill}>adicionar</button>
      <div>
        <h2>Lista do {data[playerIdx].player}:</h2>
        <ul>
          {data[playerIdx].killList.map((i, idx) => {
            return (
              <li key={idx}>
                {i.quantity}x {i.monster}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default KillCount;
