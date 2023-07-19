import styles from '../styles/layout.module.scss';
import Image from 'next/image';
import { faBars, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import useActsStore from '../store/store';


export default function Layout({ children }) {
  const beatsList = useActsStore((state) => state.beatsList);

  return (
  <div data-theme="luxury" className={`drawer drawer-end ` + styles.container}>
    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
    <nav className={`w-full `+ styles.navbar}>
      <span className={styles.iconwrap}>
        <FontAwesomeIcon width={25}  height={25} icon={faBars} />
      </span>
      <div className={styles.navheader}>
        <select className="select w-1/2" defaultValue={`Trees:`}>
          <option disabled>Trees:</option>
          <option>Joe Rogan</option>
          <option>My First Tree</option>
          <option>Create New Tree</option>
        </select>
        <FontAwesomeIcon width={25}  height={25} icon={faChevronRight} />
        <span>My First Tree</span>
      </div>
      <span className={`drawer-content ` + styles.iconwrap}>
        <label htmlFor="my-drawer" className="drawer-button">
          <Image width={25}  height={25} src={`/food.svg` } alt='beet icon'/>
        </label>
      </span>
    </nav>
    {children}
    <div className="drawer-side z-20">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <ul className={`menu p-4 w-96 h-full bg-base-200 text-base-content ` + styles.beatDrawer}>
        <p className='font-sans text-lg font-bold text-center'>My Beat Bank</p>
        {/* Sidebar content here */}
        {beatsList.map((beat, bindex) => (
          <li className={styles.beatItem} key={`beat-${bindex}`}>
            <Image 
              width={115}
              height={75}
              src={'https://dummyimage.com/115x75/000/fff.png'}
              alt='placeholder'/>
            {/* <span className='text-base'>- {beat.name} -</span> */}
          </li>
        ))}
      </ul>
    </div>
  </div>);
}