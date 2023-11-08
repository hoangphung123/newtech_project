import React, { useState } from "react"
import "./header.css"
import { useSelector, useDispatch } from 'react-redux';
import { Popover } from "antd";
import { resetUser } from '../../redux/slides/userSlide'

const Header = ({ isHiddenSeries = false, isHiddenMovies = false, isHiddenPages = false, isHiddenPricing = false, isHiddenContact = false, isHidensearch= false }) => {
  const [Mobile, setMobile] = useState(false)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  console.log('user', user)

  const handleLogout = async () => {
    localStorage.removeItem('refresh_token');
    dispatch(resetUser())
  }

  const content = (
    <div className="menu">
      <div className="menu-item">
        <a href="/profile" className="content_popover">Profile</a>
      </div>
      {user?.isAdmin && (
        <div className="menu-item">
          <a href="/system/admin" className="content_popover">System Management</a>
        </div>
      )}
      <div className="menu-item" onClick={handleLogout}>
        <p className="content_popover">Logout</p>
      </div>
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
              {!isHiddenSeries && (
                <li>
                  <a href='/'>Series</a>
                </li>
              )}
              {!isHiddenMovies && (
                <li>
                  <a href='/'>Movies</a>
                </li>
              )}
              {!isHiddenPages && (
                <li>
                  <a href='/'>Pages</a>
                </li>
              )}
              {!isHiddenPricing && (
                <li>
                  <a href='/'>Pricing</a>
                </li>
              )}
              {!isHiddenContact && (
                <li>
                  <a href='/'>Contact</a>
                </li>
              )}
            </ul>
            <button className='toggle' onClick={() => setMobile(!Mobile)}>
              {Mobile ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
            </button>
          </nav>
          <div className='account flexSB'>
            {!isHidensearch && (
              <div>
              <i className='fa fa-search'></i>
            <i class='fas fa-bell'></i>
            </div>
            )}
            <Popover placement="bottom" content={content} trigger="click">
              <i className='fas fa-user' style={{ cursor: 'pointer' }}></i>
            </Popover>
            {user?.name ? (
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
