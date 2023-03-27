import React, { useContext, useEffect, useState } from 'react'
import Image from "next/image"
import images from "../images"
import { shortAddress } from '../utils/shortAddress'
import { Loader, Button, Modal } from '@/components'
import { useRouter } from 'next/router';

import { NFTContext } from '@/context/context'

// 弹窗body样式
const PaymentBodyCMP = ({ nft, nftCurrency }) => (
    <div className="flex flex-col">
        <div className="flexBetween">
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl">Item</p>
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl">Subtotal</p>
        </div>

        <div className="flexBetweenStart my-5">
            <div className="flex-1 flexStartCenter">
                <div className="relative w-28 h-28">
                    <Image src={nft.image || images[`nft${nft.i}`]} layout="fill" objectFit="cover" />
                </div>
                <div className="flexCenterStart flex-col ml-5">
                    <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">{shortAddress(nft.seller)}</p>
                    <p className="font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-xl font-normal">{nft.name}</p>
                </div>
            </div>

            <div>
                <p className="font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-xl font-normal">{nft.price} <span className="font-semibold">{nftCurrency}</span></p>
            </div>
        </div>

        <div className="flexBetween mt-10">
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl">Total</p>
            <p className="font-poppins dark:text-white text-nft-black-1 text-base minlg:text-xl font-normal">{nft.price} <span className="font-semibold">{nftCurrency}</span></p>
        </div>
    </div>
);


const NFTDetails = () => {
    const { isLoadingNFT, currentAccount, nftCurrency, buyNFT } = useContext(NFTContext);
    const [isLoading, setIsLoading] = useState(true);
    const [nft, setNft] = useState({ image: '', tokenId: '', name: '', owner: '', price: '', seller: '', tokenURI: '' });
    const router = useRouter();
    const [paymentModal, setPaymentModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false)

    useEffect(() => {
        if (!router.isReady) return;
        setNft(router.query);
        setIsLoading(false);
    }, [router.isReady]);

    const checkout = async () => {
        await buyNFT(nft);

        setPaymentModal(false);
        setSuccessModal(true);
    };

    if (isLoading) return <Loader />;

    return (
        <div className="relative flex justify-center md:flex-col ">
            {/* 展示nft图片 */}
            <div className="relative flex-1 flexCenter sm:px-4 p-12 border-r md:border-r-0 md:border-b dark:border-x-nft-black-1 border-nft-gray-1  mt-20">
                <div className="relative w-557 minmd:w-2/3 minmd:h-2/3 sm:w-full sm:h-300 h-557"><Image
                    src={nft.image}
                    objectfit="cover"
                    className="rounded-xl shadow-lg"
                    layout="fill"
                />
                </div>
            </div>

            {/* 展示nft的详细信息 */}

            <div className="flex-1 justify-start sm:px-4 p-12 sm:pb-4 mt-20">
                <div className="flex flex-row sm:flex-col">
                    <h2 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl minlg:text-3xl">{nft.name}</h2>
                </div>

                <div className="mt-10">
                    <p className="font-poppins dark:text-white text-nft-black-1 text-xs minlg:text-base font-normal">Creator</p>
                    <div className="flex flex-row items-center mt-3">
                        <div className="relative w-12 h-12 minlg:w-20 minlg:h-20 mr-2">
                            <Image
                                src={images.creator2}
                                objectift="cover"
                                className="rounded-full"
                            />
                        </div>
                        <p className="font-poppins dark:text-white text-nft-black-1 text-xs minlg:text-base font-semibold">{shortAddress(nft.seller)}</p>
                    </div>
                </div>

                <div className="mt-10 flex flex-col">
                    <div className="w-full border-b dark:border-x-nft-black-1 border-nft-gray-1 flex flex-row">
                        <p className="font-poppins dark:text-white mb-2 text-nft-black-1 text-base minlg:text-base font-medium">
                            Details
                        </p>
                    </div>
                    <div className="mt-3">
                        <p className="font-poppins dark:text-white font-normal text-nft-black-1 text-base ">{nft.description}</p>
                    </div>
                </div>
                <div className="flex flex-row sm:flex-col mt-10">
                    {/* 如果是当前用户则不能进行购买操作 */}
                    {currentAccount === nft.seller.toLowerCase()
                        ? (
                            <p className="font-poppins dark:text-white font-normal text-nft-black-1 text-base border border-gray p-2">
                                You cannot buy your own NFT
                            </p>
                        )
                        : currentAccount === nft.owner.toLowerCase()
                            ? (
                                <Button
                                    btnName="List On Marketplace"
                                    classStyles="mr-5 sm:mb-5 sm:mr-0 rounded-xl"
                                    handleClick={() => router.push(`/resell-nft?tokenId=${nft.tokenId}&tokenURI=${nft.tokenURI}`)}
                                />
                            )
                            : (
                                <Button
                                    btnName={`Buy for ${nft.price} ${nftCurrency}`}
                                    classStyles="mr-5 sm:mb-5 sm:mr-0 rounded-xl"
                                    handleClick={() => setPaymentModal(true)}
                                />
                            )}
                </div>
            </div>

            {/* 支付弹窗 */}
            {paymentModal && (
                <Modal
                    header="Check Out"
                    body={<PaymentBodyCMP nft={nft} nftCurrency={nftCurrency} />}
                    footer={(
                        <div className="flex flex-row sm:flex-col">
                            <Button
                                btnName="Checkout"
                                classStyles="mr-5 sm:mb-5 sm:mr-0 rounded-xl"
                                handleClick={checkout}
                            />
                            <Button
                                btnName="Cancel"
                                classStyles="rounded-xl"
                                handleClick={() => setPaymentModal(false)}
                            />
                        </div>
                    )}
                    handleClose={() => setPaymentModal(false)}
                />
            )}

            {isLoadingNFT && (
                <Modal
                    header="Buying NFT..."
                    body={(
                        <div className="flexCenter flex-col text-center">
                            <div className="relative w-52 h-52">
                                <Loader />
                            </div>
                        </div>
                    )}
                    handleClose={() => setPaymentModal(false)}
                />
            )}

            {/* 确认支付 */}
            {successModal && (
                <Modal
                    header="Payment Successful!"
                    body={(
                        <div className="flexCenter flex-col text-center" onClick={() => setSuccessModal(false)}>
                            <div className="relative w-52 h-52">
                                <Image
                                    src={nft.image}
                                    objectFit="cover"
                                    layout="fill"
                                />
                            </div>
                            <p className="font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-xl font-normal mt-10"> You successfuly purchased <span className="font-semibold">{nft.name}</span> from <span className="font-semibold">{shortAddress(nft.seller)}</span></p>
                        </div>
                    )}
                    footer={(
                        <div className="flexCenter flex-col">
                            <Button
                                btnName="Check it out"
                                classStyles="sm:mb-5 sm:mr-0 sm:mb-5 rounded-xl"
                                handleClick={() => router.push('/my-nfts')}
                            />
                        </div>
                    )}
                    handleClose={() => setPaymentModal(false)}
                />
            )}


        </div>
    )
}

export default NFTDetails