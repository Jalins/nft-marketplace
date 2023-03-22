import { useState, useMemo, useCallback, useContext } from 'react';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';
import { useTheme } from 'next-themes';
import Image from 'next/image';

import { Button, Input } from '../components';
import images from '../images';
import { NFTContext } from '@/context/context';

const CreateNFT = () => {
    const { theme } = useTheme();
    const [fileUrl, setFileUrl] = useState(null);
    const [formInput, setFormInput] = useState({ price: '', name: '', description: '' });
    const router = useRouter();
    const { uploadToIPFS } = useContext(NFTContext);

    const onDrop = useCallback(async (acceptedFile) => {
        const url = await uploadToIPFS(acceptedFile[0]);
        console.log({ url });
        setFileUrl(url);
    }, []);


    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        onDrop,
        accept: 'image/*',
        maxSize: 5000000,
    });

    const fileStyle = useMemo(() => (
        `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-grey-2 flex flex-col items-center p-5 rounded-sm border-dashed
    ${isDragActive && 'border-file-active'}
    ${isDragAccept && 'border-file-accept'}
    ${isDragReject && 'border-file-reject'}
    `
    ), [isDragActive, isDragAccept, isDragReject]);


    return (
        <div className="flex justify-center sm:bx-4 p-12 ">
            <div className="w-3/5 md:w-full">
                {/* <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0 sm:mb-4 mt-10">Create New NFT</h1> */}
                {/* 上传图片区域，支持拖拽 */}
                <div className="mt-16">
                    <p className="flex-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">Upload File</p>
                    {/* 将文件上传到ipfs之后判断url是否存在，如果存在则进行预览，不存在则显示选取文件 */}
                    {fileUrl ? (
                        <aside className='mt-4 '>
                            <div className='my-12 w-full flex justify-center'>
                                <img src={fileUrl}

                                    alt="asset_file" />
                            </div>
                        </aside>
                    ) : (
                        <div className="mt-4">
                            {/* 这里的fileStyle使用useMemo可以减少样式渲染的次数，提供性能 */}
                            <div {...getRootProps()} className={fileStyle}>
                                <input {...getInputProps()} />
                                <div className="flexCenter text-center flex-col">
                                    <p className="flex-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">JPG, PNG, GIF, SVG, WEBM. Max 100mb</p>
                                    <div className="my-12 w-full flex justify-center">
                                        <Image
                                            src={images.upload}
                                            width={100}
                                            height={100}
                                            alt="Upload"
                                            className={theme === 'light' ? 'filter invert' : ''}
                                        />
                                    </div>
                                    <p className="flex-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">Drag and Drop File</p>
                                    <p className="flex-1 mt- 2font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">or browse media on your device</p>

                                </div>
                            </div>
                        </div>
                    )

                    }
                    
                </div>

                {/* nft名字区域 */}
                <Input
                    inputType="input"
                    title="Name"
                    placeholder="NFT Name"
                    handleClick={(e) => { setFormInput({ ...formInput, name: e.target.value }); }}

                />
                {/* nft描述区域 */}
                <Input
                    inputType="textarea"
                    title="Description"
                    placeholder="NFT Description"
                    handleClick={(e) => { setFormInput({ ...formInput, description: e.target.value }); }}

                />
                {/* nft价格区域 */}
                <Input
                    inputType="number"
                    title="Price"
                    placeholder="NFT Price"
                    handleClick={(e) => { setFormInput({ ...formInput, price: e.target.value }); }}

                />

                {/* 提交按钮 */}
                <div className="mt-7 w-full flex justify-end">
                    <Button
                        btnName="Create NFT"
                        classStyles="rounded-xl"
                        handleClick={() => createNFT(formInput, fileUrl, router)}
                    />
                </div>
            </div>
        </div>
    )
}

export default CreateNFT;