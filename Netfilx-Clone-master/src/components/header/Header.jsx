import React, { useState } from "react"
import "./header.css"
import {  useSelector , useDispatch} from 'react-redux';
import { Popover } from "antd";
import {resetUser} from '../../redux/slides/userSlide'


const Header = () => {
  const [Mobile, setMobile] = useState(false)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  console.log('user',user)

  const handleLogout = async() => {
    localStorage.removeItem('refresh_token');
    dispatch(resetUser())
  }

  const content = (
    <div>
      <p className="content_popover" onClick={handleLogout}>Logout</p>
      <a href="/profile" className="content_popover">profile</a>
    </div>
  );

  return (
    <>
      <header>
        <div className='container flexSB'>
          <nav className='flexSB'>
            <div className='logo'>
              <img src='./images/logo.png' alt='' />
            </div>
            {/*<ul className='flexSB'>*/}
            <ul className={Mobile ? "navMenu-list" : "flexSB"} onClick={() => setMobile(false)}>
              <li>
                <a href='/'>Home</a>
              </li>
              <li>
                <a href='/'>Series</a>
              </li>
              <li>
                <a href='/'>Movies</a>
              </li>
              <li>
                <a href='/'>Pages</a>
              </li>
              <li>
                <a href='/'>Pricing</a>
              </li>
              <li>
                <a href='/'>Contact</a>
              </li>
            </ul>
            <button className='toggle' onClick={() => setMobile(!Mobile)}>
              {Mobile ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
            </button>
          </nav>
          <div className='account flexSB'>
            <i className='fa fa-search'></i>
            <i class='fas fa-bell'></i>
            <Popover placement="bottom"  content={content} trigger="click">
              <i className='fas fa-user' style={{ cursor: 'pointer'}}></i>
            </Popover>
            {user?.name? (
              <i class='information'>{user.name}</i>
            ) : (
              <i class='information'></i>,
              <button>
                <a class="login_a" href='/Login'>Login</a>
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
