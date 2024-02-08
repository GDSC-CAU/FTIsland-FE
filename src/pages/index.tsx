import { useState } from 'react';
import Layout from 'src/components/Layout';
import Main from 'src/components/main/Main';

export default function Home() {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleMenuClick = (content: string) => {
    if(content === '메인 페이지') {
      setTabIndex(0);
    }
    else if(content === '나의 동화 목록') {
      setTabIndex(1);
    }
    else if(content === '나의 단어 목록') {
      setTabIndex(2);
    }
  }

  return (
    <Layout onClick={handleMenuClick}>
      <Main tabIndex={tabIndex} />
    </Layout>
  );
}
