import React, { useState, useEffect } from "react"
import Image from "next/image";
import { MdNotifications } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";
import Link from "next/link";
import Style from "./NavBar.module.css"
import { Discover, HelpCenter, Notification, Profile, SideBar } from "./index";
import { Button } from "../index.js";
import images from "../../images/index.js"

const NavBar = () => {
  const [discover, setDiscover] = useState(false);
  const [help, setHelp] = useState(false);
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const openMenu = (e) => {
    const btnText = e.target.innerText;
    if (btnText == "Discover") {
      setDiscover(true);
      setHelp(false);
      setNotification(false);
      setProfile(false);
    } else if (btnText == "Help Center") {
      setDiscover(false);
      setHelp(true);
      setNotification(false);
      setProfile(false);
    } else {
      setDiscover(false);
      setHelp(false);
      setNotification(false);
      setProfile(false);
    }
  };


  const openNotification = () => {
    if (!notification) {
      setNotification(true);
      setDiscover(false);
      setHelp(false);
      setProfile(false);
    } else {
      setNotification(false);
    }
  };

  const openSideBar = () => {
    if (!openSideMenu) {
      setOpenSideMenu(true);
    } else {
      setOpenSideMenu(false);
    }
  };

  const openProfile = () => {
    if (!profile) {
      setProfile(true);
      setHelp(false);
      setDiscover(false);
      setNotification(false);
    } else {
      setProfile(false);
    }
  };

  return (
    <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        {/* 左边logo */}
        <div className={Style.navbar_container_left}>
          <div className={Style.logo}>
            <Image src={images.logo3} alt="NFT MARKET PLACE" width={140} height={100} />
          </div>
        </div>

        {/* 左边的搜索框 */}
        <div className={Style.navbar_container_left_box_input}>
          <div className={Style.navbar_container_left_box_input_box}>
            <input type="text" placeholder="Search NFT" />
            <BsSearch onClick={() => { }} className={Style.search_icon} />
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
            <p onClick={(e) => openMenu(e)}>Help Center</p>
            {help && (
              <div className={Style.navbar_container_right_help_box}>
                <HelpCenter />
              </div>
            )}
          </div>

          {/* 消息组件按钮 */}
          <div className={Style.navbar_container_right_notify}>
            <MdNotifications
              className={Style.notify}
              onClick={() => openNotification()}
            />
            {notification && <Notification />}
          </div>

          <div className={Style.navbar_container_right_button}>

            <Button
              btnName="Create"
              handleClick={() => router.push("/uploadNFT")}
            />
          </div>

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

              {profile && <Profile currentAccount={currentAccount} />}
            </div>
          </div>

          <div className={Style.navbar_container_right_menuBtn}>
            <CgMenuRight
              className={Style.menuIcon}
              onClick={() => openSideBar()}
            />
          </div>


        </div>
      </div>
      
      {openSideBar && (
        <div className={Style.SideBar}>
            <SideBar setOpenSideMenu={setOpenSideMenu} />
        </div>
      )}
    </div>

  )
}

export default NavBar;