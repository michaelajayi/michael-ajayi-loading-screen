import Image from "next/image";
import ajayi from "../../../public/images/michael-ajayi.svg";
const Hero = () => {
  return (
    <main className='flex justify-center items-center w-screen h-screen bg-black overflow-hidden'>
      <div className='absolute bottom-[10%] flex justify-center w-fit h-fit mx-auto mt-[2rem]'>
        <div className='z-10 flex justify-center items-center shadow-lg'>
          <div className='flex flex-col space-y-5 items-center justify-center h-full p-10 z-10'>
            <h1 className='font-cormorant-unicase font-bold tracking-widest text-white text-[2.5rem] leading-[2.5rem]'>
              I&apos;m Michael Ajayi
            </h1>
            <p className='font-satisfy font-extralight text-white text-[1.5rem] tracking-wide leading-[1.5rem]'>
              I write colourted texts for a living...
            </p>
          </div>
        </div>
      </div>
      <div className='w-full h-full flex justify-center items-center relative'>
        <div className='w-[500] h-[500] relative flex justify-center items-center rounded-full shadow-lg aspect-square'>
          <Image
            src={ajayi}
            alt='michael ajayi'
            className='w-full h-full z-5 object-cover shadow-lg rounded-full aspect-square'
            priority
            data-priority
          />
        </div>
      </div>
    </main>
  );
};

export default Hero;
