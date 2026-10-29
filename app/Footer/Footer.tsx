import React from 'react';
import logo from "@/assists/logo.png";
import Image from 'next/image';

const Footer = () => {
    return (
        <div className='flex justify-between pt-20'>
            <div className='flex '>
                <Image src={logo} alt="name" />
                <h2>FITLOG</h2>
            </div>
            <div>
                @ 2026 FitLog - Workout LIbrary.Train hard , log honest.
            </div>
        </div>
    );
};

export default Footer;