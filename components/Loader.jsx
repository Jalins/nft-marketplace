
import images from "../images"
import Image from "next/image"

const Loader = () => (
    <div className="flexCenter w-full my-4 mt-20">
      <Image src={images.loader} alt="loader" width={100}  />
    </div>
  );
  
  export default Loader;