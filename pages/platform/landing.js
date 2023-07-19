import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useActsStore from '../../store/store';
import { postNewAct } from '../api/beat';

import Layout from '../../components/layout';
import styles from '../../styles/Landing.module.scss';


export default function Landing() {
  const actsList = useActsStore((state) => state.actsList);
  const updateActsState = useActsStore((state) => state.updateActsState);
  const updateSelectedAct = useActsStore((state) => state.updateSelectedAct);
  const [scrollDim, setScrollDim] = useState(0);
  
  useEffect(() => {
    const listElem = document.getElementsByClassName('actlist')[0];
    const firstItem = listElem.firstChild;
    const limit = firstItem.offsetLeft;

    if (!actsList || !actsList.length) {
      updateActsState();
      // setScrollDim(limit);
    }
  }, []);
  
  console.log('Landing - what is actsState:', actsList);
  
  const handleNewAct = async () => {
    await postNewAct(updateActsState);
  }

  const handleViewAct = (event) => {
    const actId = parseInt(event.currentTarget.classList[0]);
    const targetAct = actsList.find(act => act.id === actId);
    updateSelectedAct(targetAct);
  }
  

  // 0 = center, 
  // -1 * firstItem.offsetLeft = firstItem
  // firstItem.offsetleft = lastitem

  const handleScrub = (dir) => {
    console.log('shifting acts');
    const listElem = document.getElementsByClassName('actlist')[0];
    const firstItem = listElem.firstChild;
    const limit = -1 * firstItem.offsetLeft;

    console.log('listElem is:', listElem,
    '\n listElem.offsetWidth:', listElem.offsetWidth,
    '\n listElem.offsetLeft:', listElem.offsetLeft,
    '\n firstItem is:', firstItem,
    '\n firstItem.offsetWidth:', firstItem.offsetWidth,
    '\n firstItem.offsetLeft:', firstItem.offsetLeft,
    '\n current scrollDim', scrollDim,
    );

    if (dir === 'LEFT') {
      if (scrollDim > firstItem.offsetLeft) {
        setScrollDim((scrollDim - firstItem.offsetWidth) - 16);
      }
    } else {
      if (scrollDim < (listElem.offsetWidth / 2) )
      setScrollDim((scrollDim + firstItem.offsetWidth) - 16);
      // if (scrollDim > listElem.offsetWidth) {
      //   setScrollDim((scrollDim + firstItem.offsetWidth) - 16);
      // }
    }
  }

  // const translateX = () => {
  //   let scrollVal = 0;
  //   return `translateX(${scrollVal})`;
  // }

  const translateX = {
    transform: `translateX(${scrollDim}px)`
  }


  
  return (
    <Layout>
      <section className={`2xl:container md:mx-auto h-screen ` + styles.landingwrap}>
        <div className={`h-1/3 xl:container md:mx-auto ` + styles.header}>
          <header className='h-full'>
            <h1>BeetTree</h1>
            <div className={styles.actActions}>
              <button className='btn rounded-none px-16' onClick={() => handleScrub('LEFT')}>Scrub left</button>
              <button className='btn rounded-none px-16' onClick={handleNewAct}>Add New Act...</button>
              <button className='btn rounded-none px-16' onClick={() => handleScrub('RIGHT')}>Scrub right</button>
            </div>
          </header>
        </div>
        <div className={`h-1/3 xl:container md:mx-auto mb-6 bg-secondary `+ styles.listwrap}>
          <span className='text-lg'>Acts List</span>
          <ul className={`actlist ` + styles.actlist} style={translateX}>
            {actsList.map((act, index) => (
              <Link href="/platform/viewAct" key={index}>
                <li onClick={(e) => handleViewAct(e)} className={`${(act.id)} ${styles.actrow}`}>
                  <span className={styles.actId}>ACT #{act.id}</span>
                  <span className={styles.actTitle}>"{act.name}"</span>
                  <ul className={styles.beatlist}>
                    {actsList[(index)].beats.map((beat, bindex) => (
                      <li className={styles.beatitem} key={`beat-${bindex}`}>
                        <div className={styles.beatmeta}>
                          <Image 
                            width={25}
                            height={20}
                            src={'https://dummyimage.com/25x20/000/fff.png'}
                            alt='placeholder'/>
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <h2 className='h-1/3'>
          <Link href="/">Back</Link>
        </h2>
      </section>
    </Layout>
  )
}

