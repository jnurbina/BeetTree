import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { shallow } from 'zustand/shallow'
import useActsStore from '../../store/store';
import { delSelectedAct, postNewBeat, delBeatFromSelectedAct } from '../api/beat';

import Layout from '../../components/layout';
import styles from '../../styles/ViewAct.module.scss';


export default function ViewAct() {
  const { selectedAct, selectedActBeats } = useActsStore(
    (state) => ({selectedAct: state.selectedAct, selectedActBeats: state.selectedActBeats}));
  const updateActsState = useActsStore((state) => state.updateActsState);
  const updateSelectedAct = useActsStore((state) => state.updateSelectedAct);
  const updateSelectedActBeats = useActsStore((state) => state.updateSelectedActBeats);
  let showContent = false;

  console.log('ViewAct - what is selectedAct:', selectedAct);
  console.log('ViewAct - what is selectedActBeats:', selectedActBeats);

  useEffect(() => {
    if (selectedAct.beats !== selectedActBeats) {
      updateSelectedActBeats(selectedAct.beats);
    }
  }, []);

  const handleNewBeat = async () => {
    console.log('new beat handler - selectedAct', selectedAct);
    await postNewBeat(updateSelectedActBeats, selectedAct);
  }

  const handleDelAct = async () => {
    await delSelectedAct(updateActsState, selectedAct);
    updateSelectedAct({});
    updateSelectedActBeats([]);
  }

  const handleDelBeat = async (event) => {
    console.log('what is parentNode in deleteBeat:', event.currentTarget.parentNode.parentNode);
    const beatId = parseInt(event.currentTarget.parentNode.parentNode.classList[0]);
    const targetBeat = selectedActBeats.find(beat => beat.id === beatId);
    console.log('do we find targetBeat:', targetBeat);
    delBeatFromSelectedAct(updateSelectedActBeats, selectedAct, targetBeat);
    console.log('what is seslectedActBeats after deletion:', selectedActBeats);
    if (selectedActBeats.length === 0) {
      updateSelectedActBeats([]);
    }
  }

  const handleShowContent = () => {
    showContent = !showContent;
  }

  const handleHideContent = () => {
    showContent = !showContent;
  }
  
  const handleExit = () => {
    if (selectedAct.beats.length !== selectedActBeats.length) {
      updateActsState();
    }
    updateSelectedAct({});
    updateSelectedActBeats([]);
  }

  return (
    <Layout>
      <section className={`2xl:container md:mx-auto h-screen ` + styles.wrapper}>
        <div className={`h-1/3 xl:container md:mx-auto ` + styles.header}>
          <header className='h-full'>
            <h1>Act #{selectedAct.id} - {selectedAct.name}</h1>
            <div className={styles.actActions}>
              <button className='btn' onClick={handleNewBeat}>Add New Beat...</button>
              <Link href="/platform/landing">
                <button className='btn' onClick={handleDelAct}>Delete this Act</button>
              </Link>
            </div>
          </header>
        </div>
        <div className='xl:container md:mx-auto mb-6'>
          <ul className={styles.beatlist}>
            {selectedActBeats.length > 0 && selectedActBeats.map((beat, index) => (
              <li onMouseOver={handleShowContent} onMouseOut={handleHideContent} className={`${beat.id} `+  styles.beatitem} key={index}>
                <div className={styles.beatimage}>
                  <Image 
                    width={225}
                    height={150}
                    src={'https://dummyimage.com/225x150-/000/fff.png'}
                    alt='placeholder'/>
                  <span onClick={(e) => handleDelBeat(e)} className={styles.iconWrapper}>
                    <FontAwesomeIcon icon={faXmark} style={{color: "#ea0b0b",}} />
                  </span>
                </div>
                <div className={styles.beatMetadata}>
                  <span className={styles.beatName}>{beat.name}</span>
                  <span className={styles.beatCaption}>"{beat.notes}"</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className={`xl:container md:mx-auto ` + styles.beatDescription}>
          {/* { showContent && 
            <span>"{beat.content}"</span>
          } */}
          {/* <span>"{beat.content}"</span> */}
        </div>

        <div className={`xl:container md:mx-auto ` + styles.footer}>
          <h2 onClick={handleExit}>
            <Link href="/platform/landing">Back</Link>
          </h2>
        </div>

      </section>
    </Layout>
  )
}

