import Image from 'next/image';
import { useTheme } from 'next-themes';

import images from '../images';
import { Button } from './';

const FooterLinks = ({ heading, items }) => (
  <div className="flex-1 items-start justify-start">
    <h3 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl mb-10">{heading}</h3>
    {items.map((item, index) => (
      <p key={index} className="font-poppins dark:text-white text-nft-black-1 font-normal text-base cursor-pointer dark:hover:text-nft-gray-1 hover:text-nft-black-1 my-3">{item}</p>
    ))}
  </div>
);

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className="flexCenter flex-col border-t dark:border-nft-black-1 border-nft-gray-1 sm:py-8 py-16">
      {/* 搜索框、各页面链接 */}
      <div className=" w-full md:flex-col minmd:w-4/5 flex flex-row sm:px-4 px-16">
        <div className="flexStart flex-1 flex-col">
          <div className="cursor-pointer flexCenter">
            <Image src={images.logo02}  width={32} height={32} alt="Logo" />
            <p className="dark:text-white text-nft-black-1 font-semibold text-lg ml-1">MIN<span className="text-nft-red-violet">TED</span></p>
          </div>
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base mt-6">Get the lastest updates</p>
          <div className="md:w-full flexBetween minlg:w-557 w-357 mt-6 dark:bg-nft-black-2 bg-white dark:border-nft-black-2 border-nft-gray-2 rounded-md ">
            <input
              type="email"
              placeholder="Your Email"
              className="h-full flex-1 w-full dark:bg-nft-black-2 bg-white px-4 rounded-md dark:text-white text-nft-black-1 font-normal text-xs minlg:text-lg outline-none"
            />
            <div className="flex-initial">
              <Button
                btnName="Email Me"
                classStyles="rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="flex-1 flexBetweenStart flex-wrap ml-10 md:ml-10 md:mt-8">
          <FooterLinks
            heading="MINTED"
            items={['Explore', 'How It Works', 'Contact Us']}
          />
          <FooterLinks
            heading="Support"
            items={['Help Center', 'Terms Of Service', 'Legal', 'Privacy Policy']}
          />
        </div>
      </div>

      {/* 版权声明 */}
      <div className="flexCenter w-full mt-5 border-t dark:border-nft-black-1 border-nft-gray-1 sm:px-4 px-16">
        <div className="flexBetween flex-row w-full minmd:w-4/5 sm:flex-col mt-7">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base">MIN<span className="text-nft-red-violet">TED</span>, Inc. All Rights Reserved</p>
          <div className="flex flex-row sm:mt-4">
            {[images.instagram, images.twitter, images.discord, images.telegram].map((image, index) => (
              <div
                className="mx-2 cursor-pointer"
                key={index}
              >
                <Image
                  src={image}
                  height={24}
                  weight={24}
                  alt="social"
                  className={theme === 'light' ? 'filter invert' : ''}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;