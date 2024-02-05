import { ReactElement } from 'react';

import Layout from '@/src/components/Layout';

export default function Home() {
  return <>메인페이지</>;
}

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
