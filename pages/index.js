import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <Layout>
      <section data-theme="luxury" className={`2xl:container md:mx-auto h-screen ` + styles.container}>
        <Head>
          <title>BeetTree</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className={styles.intro}>
          <h1 className={styles.title}>
            <Link href="/platform/landing">Enter TreeBeat</Link>
          </h1>
        </div>
        

        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }
          * {
            box-sizing: border-box;
          }
        `}</style>
      </section>
    </Layout>
  )
}
