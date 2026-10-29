import Image from 'next/image';
import React from 'react';
import logo from "@/assists/banner.png"

const Banner = () => {
    return (
        <div className='grid grid-cols-2 gap-2 pt-8 bg-gray-800'>
            <div className='pl-40'>
                  <h2 className='text-yellow-300 pb-5'>Workout Library</h2>
                  <span className='text-5xl pt-20'>
                    Train With INTENT.LOG
                  </span>
                  <div className='text-5xl pb-5'>
                    EVERY SET.
                  </div>
                 <span className='font-bold pt-20'>
                     FitLog is adark, no-nonsense gym companion:pick a lift,lock it into todays plan,and watch the weeks work add up.
          
                 </span>
            
           <div className='pt-5'>
             <button className="btn btn-warning bg-lime-300">BROWSE WORKOUTS</button>

           </div>
           </div>

          <div className='pl-70'>
           <Image src={logo} alt='Pic'></Image>
          </div>
          
           

        </div>
    );
};

export default Banner;