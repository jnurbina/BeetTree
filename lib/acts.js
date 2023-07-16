
export async function getAllActsData() {
  const config = {
    method: 'GET',
    headers: {  "Content-Type": "application/json"}
  };
  const res = await fetch('http://localhost:8080/acts', config);
  const actList = await res.json();

  let totalBeats = [];

  for (let i = 0; i < actList.length; i++) {
    const beatRes = await fetch(`http://localhost:8080/acts/${actList[i].id}/beats`)
      .then(result => {return result});
    const beatList = await beatRes.json();
    actList[i].beats = [...beatList];
    
    for (let j = 0; j < beatList.length; j++) {
      totalBeats.push(beatList[j]);
    }
  }

  return { actList, totalBeats };
}

export async function getSelectedActBeats(actId) {
  const url = `http://localhost:8080/acts/${actId}/beats`;
  const config = {
    method: 'GET',
    headers: {  "Content-Type": "application/json"}
  };
  const res = await fetch(url, config);
  const beatList = await res.json();

  return { beats: beatList };
}