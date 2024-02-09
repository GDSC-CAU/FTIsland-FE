import React, { ReactElement } from 'react'
import Menu from './Menu';

interface MenuProps {
  setContent: (setContent: ReactElement) => void;
  onClick: (content: string) => void;
  handleSideMenu: (content: boolean) => void;
}
const LanguageSetting: React.FC<MenuProps> = ({setContent, onClick, handleSideMenu}) => {
    const handleBack = () => {
        setContent(<Menu setContent={setContent} onClick={onClick} handleSideMenu={handleSideMenu} />);
      };
  return (
    <div>
        <button onClick={handleBack}></button>
        <button></button>
    </div>
  )
}

export default LanguageSetting