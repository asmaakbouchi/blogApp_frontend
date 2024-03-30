import { Button, Navbar, NavbarToggle, TextInput } from 'flowbite-react';
import React from 'react';
import { Link, useLocation} from 'react-router-dom';
import { AiOutlineSearch} from 'react-icons/ai';
import {FaMoon }from 'react-icons/fa';

const Header = () => {
const path=useLocation().pathname;

    return (
        <Navbar className=" text-gray-800">
            <Link to="/" className='self-center whitespace-norap text-sm sm:text-xl font-semibold'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg'> My Idea</span>
            </Link>
            <form>
                <TextInput
                 type='text' placeholder='search' 
                 rightIcon={AiOutlineSearch}
                 className='hidden lg:inline'>
                </TextInput>
            </form>
            <Button className='w-12 h-10 lg:hidden' color='gray' pill>
                <AiOutlineSearch/>
            </Button>
            
            <div className='flex gap-2 md:order-2'>
                <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
                    <FaMoon/>
                </Button>
                <Link to="login">
                    <Button gradientDuoTone='purpleToBlue' >
                        Login
                    </Button>
                </Link>
                <NavbarToggle/>
            </div>
            <Navbar.Collapse >
                <Navbar.Link active={path==='/'} as={'div'}><Link to="/">Home</Link></Navbar.Link>
                <Navbar.Link  active={path==='/about'} as={'div'}><Link to="about">About</Link></Navbar.Link>
                <Navbar.Link  active={path==='/contact'} as={'div'}><Link  to="contact">Contact</Link></Navbar.Link>
            </Navbar.Collapse>

        </Navbar>
    );
}

export default Header;