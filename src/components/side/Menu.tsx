import React, { ReactElement } from 'react'
import LanguageSetting from './LanguageSetting'

interface MenuProps {
    setContent: (setContent: ReactElement) => void;
  }

const Menu: React.FC<MenuProps> =  ({setContent}) => {
    const handleClick = () => {
        setContent(<LanguageSetting setContent={setContent}/>)
    }
  return (
    <div>
        <button onClick={handleClick}></button>
    </div>
  )
}

export default Menu