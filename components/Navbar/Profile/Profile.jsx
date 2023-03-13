import React from 'react'
import Link from 'next/link'
import Style from "./Profile.module.css"
import Image from "next/image";

import images from "../../../images"

import { FaUserAlt, FaRegImage, FaUserEdit } from "react-icons/fa";
import { MdHelpCenter,MdLogout } from "react-icons/md";

const Profile = () => {
  return (
    <div className={Style.profile}>
      {/* 头像 */}
      <div className={Style.profile_account}>
        <Image
          src={images.user3}
          alt="user profile"
          width={50}
          height={50}
          className={Style.profile_account_img}
        />

        <div className={Style.profile_account_info}>
          <p>Shoaib Bhai</p>
          <small>0x4er5cfd8df54sf54...</small>
        </div>
      </div>

      {/* 信息 */}
      <div className={Style.profile_menu}>
        <div className={Style.profile_menu_one}>
          <div className={Style.profile_menu_one_item}>
            <FaUserAlt />
            <p>
              <Link href={{ pathname: "/author" }}>My Profile</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaRegImage />
            <p>
              <Link href={{ pathname: "/author" }}>My Items</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaUserEdit />
            <p>
              <Link href={{ pathname: "/account" }}>Edit Profile</Link>
            </p>
          </div>
        </div>

        <div className={Style.profile_menu_two}>
          <div className={Style.profile_menu_one_item}>
            <MdHelpCenter />
            <p>
              <Link href={{ pathname: "/contactus" }}>Help</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <MdLogout />
            <p>
              <Link href={{ pathname: "/logout" }}>Log Out</Link>
            </p>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Profile