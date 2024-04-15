import { Avatar, Button, Dropdown, Navbar, NavbarToggle, TextInput } from 'flowbite-react';
import React from 'react';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { AiOutlineSearch} from 'react-icons/ai';
import {FaMoon } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

const Header = () => {
const path=useLocation().pathname;
const navigate = useNavigate(); 
const currentUser = useSelector(state => state.user);
console.log("this is current user ",currentUser?.name);


const isLoggedIn = () => {

    const token = localStorage.getItem('tokenkey');

    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      if (decodedToken.exp < currentTime) {
        console.log('Token expired');
        return false;
      }
      // Token valid, user is logged in
      return true;
    } else {
      console.log('Login first');
      return false;
    }
};

const handleLogout = () => {
    localStorage.removeItem('tokenkey');
    navigate('/login');
    console.log('Logged out');
  };


    return (
        <Navbar className=" text-gray-800 border-b-2">
            <Link to="/" className='self-center whitespace-norap text-sm sm:text-xl font-bold'>
                 <span className='px-2 py-1'> Coding Blog</span> 
            {/* <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg'> My Idea</span> */}
            </Link>
            {/* <form>
                <TextInput
                 type='text' placeholder='search' 
                 rightIcon={AiOutlineSearch}
                 className='hidden lg:inline'>
                </TextInput>
            </form> */}
            <Button className='w-12 h-10 lg:hidden' color='gray' pill>
                <AiOutlineSearch/>
            </Button>
            
            <div className='flex gap-2 md:order-2'>
                {/* <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
                    <FaMoon/>
                </Button>  */}
             {
             isLoggedIn()?(
                    <Dropdown arrowIcon={false} inline 
                    label={<Avatar alt='user' img='' rounded/>}>
                    <Dropdown.Header>
                        <span className='block text-sm'>{currentUser?.email}</span> 
                         <span className='block text-sm'>{currentUser?.name}</span>
                    </Dropdown.Header>
                    {/* <Link to={'/profile'}>
                    <Dropdown.Item>Profile</Dropdown.Item>
                    </Link> */}
                    <Dropdown.Divider/> 
                    <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
                    </Dropdown>
                ):
                (
                    <Link to="login">
                        <Button gradientDuoTone='purpleToBlue' outline>
                            Login
                        </Button>
                    </Link>
                )
                }
                <NavbarToggle/>
            </div>
            <Navbar.Collapse >
                <Navbar.Link active={path==='/'} as={'div'}><Link to="/">Home</Link></Navbar.Link>
                {isLoggedIn() && (
                 <>
                <Navbar.Link  active={path==='/myposts'} as={'div'}><Link to="myposts">My Posts</Link></Navbar.Link>
                </>)}
                <Navbar.Link  active={path==='/contact'} as={'div'}><Link  to="contact">Contact</Link></Navbar.Link>
            </Navbar.Collapse>

        </Navbar>
    );
}
export default Header;