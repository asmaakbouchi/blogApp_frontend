import { Avatar, Button, Dropdown, Navbar, NavbarToggle, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { AiOutlineSearch} from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { fetchProfil } from '../api/user';


const Header = () => {

const path=useLocation().pathname;
const navigate = useNavigate(); 
const [userConnected, setUserConnected] = useState(null);

// const currentUser = useSelector(state => state.user);
//console.log("this is current user ",currentUser?.name);
console.log("this is current user ",userConnected?.name);

const fetchUserData = async () => {
    try {
      const data = await fetchProfil();
      setUserConnected(data);
    } catch (error) {
      console.error('Error fetching user data', error);
    }
};

useEffect(()=>{fetchUserData()},[]);


const isAuth = () => {
    const token = localStorage.getItem('tokenkey');
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      if (decodedToken.exp < currentTime) {
        console.log('Token expired');
        return false;
      }
      return true;
    }
     else {
      console.log('try to login ');
      return false;
    }
};

const Logout = () => {
    localStorage.removeItem('tokenkey');
    navigate('/login');
  };
    return (
        <Navbar className=" text-gray-800 gradient-to-r from-indigo-500 via- to-pink-500 ">
            <Link to="/" className='self-center whitespace-norap text-sm sm:text-xl font-bold'>
                 <span className='px-2 py-1 text-purple-600'>Coding Blog</span> 
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
             {
             isAuth()?(

                <div className='flex items-center justify-between border-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 rounded-3xl px-2 py-1'>
                {/* Avatar and Dropdown */}
                <div className='flex items-center'>
                    <Dropdown arrowIcon={false} inline label={<Avatar alt='user' img='' rounded/>}>
                        <Link to={'/profil'}>
                            <Dropdown.Header>Profile</Dropdown.Header>
                        </Link>
                        <Dropdown.Divider/> 
                        <Dropdown.Item onClick={Logout}>Log out</Dropdown.Item>
                    </Dropdown>
                    {/* User's name */}
                    <p className='ml-2 font-semibold text-white'>{userConnected?.name}</p>
                </div>
            </div>
            
                                    
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
                {isAuth() && (
                 <>
                <Navbar.Link  active={path==='/myposts'} as={'div'}><Link to="myposts">My Posts</Link></Navbar.Link>
                </>)}
                <Navbar.Link  active={path==='/contact'} as={'div'}><Link  to="contact">Contact</Link></Navbar.Link>
            </Navbar.Collapse>

        </Navbar>
    );
}
export default Header;