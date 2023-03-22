import { BiWalletAlt } from "react-icons/bi"

const Button = ({btnName, classStyles, handleClick}) => {
  return (
    <button  
    type="button"
    className={`nft-gradient text-sm minlg:text-lg py-2 px-6 min-lg:px-8 font-poppins font-semibold text-white inline-flex items-center ${classStyles} `}
    onClick={handleClick}
    >
      {`${btnName}` == "Connect"?<BiWalletAlt className="mr-1"/>:""}
      {btnName}
      
    </button>
  )
}

export default Button