import Layout from '../../components/layout';
import { getAllActsData, getFocusedActData } from '../../lib/acts';

export async function getStaticPaths() {
  const paths = getAllActsData().then((result) => {
    return result.actList.map(act => act.id);
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const focusedAct = getFocusedActData(params.id);
  return {
    props: {
      focusedAct,
    },
  };
}

export default function Act({ focusedAct }) {
  return <Layout>...</Layout>;
}
