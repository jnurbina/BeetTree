import React, { useEffect } from 'react';
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
  
  useEffect(() => {
    if (!actsList || !actsList.length) {
      updateActsState();
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
  
  return (
    <Layout>
      <section className={`2xl:container md:mx-auto h-screen ` + styles.landingwrap}>
        <div className={`h-1/3 xl:container md:mx-auto ` + styles.header}>
          <header className='h-full'>
            <h1>BeetTree</h1>
            <button className='btn' onClick={handleNewAct}>Add New Act...</button>
          </header>
        </div>
        <div className='xl:container md:mx-auto mb-6'>
          <ul className={styles.actlist}>
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
        <h2>
          <Link href="/">Back</Link>
        </h2>
      </section>
    </Layout>
  )
}

