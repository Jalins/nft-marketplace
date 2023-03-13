import React from 'react'
import Style from "./Button.module.css"
import { BiWallet } from "react-icons/bi"
const Button = ({btnName, handleClick}) => {
  return (
    <div className={Style.box}>
        <button className={Style.button} onClick={()=>handleClick()}>
           {`${btnName}` == "Connect Wallet"?<BiWallet className={Style.a}/>:""}
           <a className={Style.b}>{btnName}</a>
        </button>
    </div>
  )
}

export default Button