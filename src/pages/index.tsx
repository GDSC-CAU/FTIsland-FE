import { ReactElement, useEffect, useState } from 'react';

import Layout from 'src/components/Layout';
import Main from 'src/components/main/Main';
import { useUser } from 'src/hook/useUser';

const Home = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const { menu } = useUser();

  useEffect(() => {
    if (menu === '메인 페이지') {
      setTabIndex(0);
    } else if (menu === '나의 동화 목록') {
      setTabIndex(1);
    } else if (menu === '나의 단어 목록') {
      setTabIndex(2);
    }
  }, [menu]);

  return <Main tabIndex={tabIndex} />;
};

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Home;
