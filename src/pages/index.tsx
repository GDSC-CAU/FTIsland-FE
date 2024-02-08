import { ReactElement } from 'react';
import Layout from 'src/components/Layout';
import Main from 'src/components/main/Main';


export default function Home() {
  return <Main/>;
}

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
