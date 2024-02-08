import React, { ReactElement } from 'react'
import Menu from './Menu';

interface MenuProps {
    setContent: (newContent: ReactElement) => void;
  }

const LanguageSetting: React.FC<MenuProps> = ({setContent}) => {
    const handleBack = () => {
        setContent(<Menu setContent={setContent} />);
      };
  return (
    <div>
        <button onClick={handleBack}></button>
        <button></button>
    </div>
  )
}

export default LanguageSetting