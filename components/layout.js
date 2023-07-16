import styles from '../styles/layout.module.scss';
import Image from 'next/image';
import { faBars, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Layout({ children }) {
  return <div data-theme="luxury" className={styles.container}>
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
      <span className={styles.iconwrap}>
        <Image width={25}  height={25} src={`/food.svg` } alt='beet icon'/>
      </span>
    </nav>
    {children}
    </div>;
}