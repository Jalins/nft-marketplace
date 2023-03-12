import React, { useState, useEffect } from "react"
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import Style from "./NavBar.module.css"
import { Discover, HelpCenter, Profile } from "./index";
import { Button } from "../index.js";
import images from "../../images/index.js"
// import { AiFillWallet } from "react-icons/ai"

const NavBar = () => {
  const [discover, setDiscover] = useState(false);
  const [help, setHelp] = useState(false);
  const [profile, setProfile] = useState(false);

  const openMenu = (e) => {
    const btnText = e.target.innerText;
    if (btnText == "Discover") {
      discover ? setDiscover(false) : setDiscover(true)
      setHelp(false);
      setProfile(false);
    } else if (btnText == "Help") {
      help ? setHelp(false) : setHelp(true)
      setDiscover(false);
      setProfile(false);
    } else {
      setDiscover(false);
      setHelp(false);
      setProfile(false);
    }
  };


  const openProfile = () => {
    if (!profile) {
      setProfile(true);
      setHelp(false);
      setDiscover(false);
    } else {
      setProfile(false);
    }
  };

  const currentAccount = ""

  return (
    <div className={Style.background}>
     <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        {/* 左边logo */}
        <div className={Style.navbar_container_left}>
          <div className={Style.logo}>
            <Image src={images.logo1} alt="NFT MARKET PLACE" width={140} height={100} />
          </div>

          {/* 左边的搜索框 */}
          <div className={Style.navbar_container_left_box_input}>
            <div className={Style.navbar_container_left_box_input_box}>
              <input type="text" placeholder="Search NFT" />
              <BsSearch onClick={() => { }} className={Style.search_icon} />
            </div>
          </div>
        </div>

        

        {/* 右边 发现 按钮 */}
        <div className={Style.navbar_container_right}>
          <div className={Style.navbar_container_right_discover}>
            <p onClick={(e) => openMenu(e)}>Discover</p>
            {discover && (
              <div className={Style.navbar_container_right_discover_box}>
                <Discover />
              </div>
            )}
          </div>

          {/* 帮助中心按钮 */}
          <div className={Style.navbar_container_right_help}>
            <p onClick={(e) => openMenu(e)}>Help</p>
            {help && (
              <div className={Style.navbar_container_right_help_box}>
                <HelpCenter />
              </div>
            )}
          </div>
          {/* connect wallet按钮 */}
          <div className={Style.navbar_container_right_button}>
            
            {currentAccount == "" ? (
              <Button btnName="Connect Wallet" handleClick={() => {}} />
            ) : (
              <Button
                btnName="Create"
                handleClick={() => router.push("/uploadNFT")}
              />
            )}
            
          </div>

          {/* 用户组件 */}
          <div className={Style.navbar_container_right_profile_box}>
            <div className={Style.navbar_container_right_profile}>
              <Image
                src={images.user3}
                alt="Profile"
                width={40}
                height={40}
                onClick={() => openProfile()}
                className={Style.navbar_container_right_profile}
              />

              {profile && <Profile />}
            </div>
          </div>

        </div>
      </div>
      
    </div>
    </div>

  )
}

export default NavBar;