import { Spotlight } from './ui/Spotlight'
import { cn } from "@/lib/utils";
import { TextGenerateEffect } from './ui/TextGenerateEffect';
import MagicButton from './ui/MagicButton';
import { FaLocationArrow } from 'react-icons/fa';

const Hero = () => {
  return (
    <div className='pb-20 pt-36'>
      <div>
        <Spotlight className='-top-40 -left-10 md:-left-32 md:-top-20 h-screen' fill="white" />
        <Spotlight className='-top-10 left-full h-[80vh] w-[50vw]' fill="yellow" />
        <Spotlight className='top-28 left-80 h-[80vh] w-[50vw]' fill="blue" />
      </div>

      <div className="absolute top-0 left-0 flex h-screen w-full items-center justify-center bg-white dark:bg-[#000315]">
      <div
      className={cn(
        "absolute inset-0",
        "[background-size:80px_80px]",
        "[background-image:linear-gradient(to_right,rgba(228,228,231,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(228,228,231,0.2)_1px,transparent_1px)]",
        "dark:[background-image:linear-gradient(to_right,rgba(38,38,38,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(38,38,38,0.2)_1px,transparent_1px)]",
      )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black">
      </div>
      {/* <p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl">
        Trust Vote
      </p> */}
    </div>

        <div className='flex justify-center relative my-20 z-10'>
            <div className='max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col  items-center justify-center'>
                <h2 className='uppercase tracking-widest text-xs text-center text-blue-100 max-w-80'>
                    Trust vote
                </h2>
                 <TextGenerateEffect 
                 className="text-center text-[40px] md:text-5xl lg:text-6xl"
                 words="A Decentralised Blockchain Voting DAPP"
                /> 

                <p className='text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-lg text-gray-400 mt-4'>
                    A decentralized voting application that ensures transparency, security, and trust for SRC electoral process. Built on the Ethereum blockchain, it empowers users to cast their votes with confidence, knowing that their choices are immutable and verifiable.

                </p>
                
                  <MagicButton
                  title="SIGN IN"
                  icon={<FaLocationArrow />}
                  position='right'
                  />
                
            </div>
        </div>

    </div>
  )
}

export default Hero
