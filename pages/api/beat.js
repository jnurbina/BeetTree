import { getAllActsData, getSelectedActBeats } from '../../lib/acts';
import useActsStore from '../../store/store';

export const postNewAct = async (updateActsState) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'New Act' })
  };

  try {
    const response = await fetch('http://localhost:8080/acts', requestOptions);
    const data = await response.json();

    console.log('posted new act:', data);

    const actsData = await getAllActsData();
    const { actList } = actsData;
    
    console.log('inside beat.js try - is actsList correct deconstructuring:', actList);

    if (Array.isArray(actList) && actList.length > 0) {
      const lastAct = actList[actList.length - 1];

      if (data.id === lastAct.id) {
        updateActsState();
      } else {
        throw Error(`New Data: ${lastAct.id} doesnt match POSTED data: ${data.id}`);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export const delSelectedAct = async (updateActsState, selectedAct) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    const response = await fetch(`http://localhost:8080/acts/${selectedAct.id}`, requestOptions);
    // const data = await response.json();

    // console.log('posted new act:', data);

    const actsData = await getAllActsData();
    const { actList } = actsData;

    if (Array.isArray(actList) && actList.length > 0) {
      if (!actList.includes(selectedAct)) {
        updateActsState();
      } else {
        throw Error(`New Data: ${actList} didnt delete DELETE payload: ${selectedAct}`);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export const postNewBeat = async (updateSelectedActBeats, selectedAct) => {
  const url = `http://localhost:8080/acts/${selectedAct.id}/beats`;
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      name: 'New Beat', 
      time: '00:00 - 00:30', 
      content: 'Add description...',
      cameraAngle: 'Add angle notes',
      notes: 'Add a caption'
    })
  };

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    console.log('posted new beat:', data);

    const selectedActBeats = await getSelectedActBeats(selectedAct.id);
    const { beats } = selectedActBeats;

    console.log('are we receiving the new beats:', beats);

    if (Array.isArray(beats) && beats.length > 0) {
      const lastBeat = beats[beats.length - 1];

      if (data.id === lastBeat.id) {
        updateSelectedActBeats(beats);
      } else {
        throw Error(`New Data: ${lastBeat.id} doesnt match POSTED data: ${data.id}`);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export const delBeatFromSelectedAct = async (updateSelectedActBeats, selectedAct, beatItem) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: '',
  };

  try {
    const response = await fetch(`http://localhost:8080/acts/${selectedAct.id}/beats/${beatItem.id}`, requestOptions);
    // const data = await response.json();

    // console.log('deleted beat:', data);

    const beatData = await getSelectedActBeats(selectedAct.id);
    const { beats } = beatData;

    console.log('what is beats when its one beat:', beats);

    if (Array.isArray(beats)) {
      if (!beats.includes(beatItem)) {
        updateSelectedActBeats(beats);
      } else {
        throw Error(`New Data: ${beats} didnt delete DELETE payload: ${beatItem}`);
      }
    }
  } catch (error) {
    console.error(error);
  }
}


