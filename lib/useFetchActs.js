import { useState, useEffect } from 'react';
import { getAllActsData } from './acts';

export function useFetchActs(oldState) {
  const [totalActs, setActs] = useState();
  
  useEffect(() => {
    const actHandler = async (cData) => {
      const actsData = await getAllActsData();
      if (cData && (cData.actList.length === actsData.actList.length)) return;
      console.log('successfully updated actsData - from:', cData.actList.length, '\n to:', actsData.actList.length); 
      setActs(actsData);
    }
  }, []);
  return totalActs;
}
