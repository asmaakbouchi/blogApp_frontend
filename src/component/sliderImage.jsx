import React from 'react';
import { Button } from 'flowbite-react';
import img_mindset from '../assets/image/world.jpg';
import { Link } from 'react-router-dom';

export default function sliderImage() {
    return (
        <div
          className="relative overflow-hidden bg-cover bg-no-repeat bg-center p-12 text-center"
          style={{ backgroundImage: `url(${img_mindset})`, height: '400px' }}
        >
            <div
                className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
            >
                <div className="flex h-full items-center justify-center">
                    <div className="text-white">
                        <h2 className="mb-4 text-4xl font-semibold">Welcome to Our Blog</h2>
                        <h4 className="mb-6 text-xl font-semibold">Discover the Latest Insights</h4>
                        <Link to={'/contact'}>
                            <Button gradientDuoTone='purpleToPink' className='border-neutral-50 px-7 pb-[8px] pt-[10px] ml-[80px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10'>
                                Contact Us
                            </Button> 
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
