import { Menu } from 'antd'
import React, { useState } from 'react'
import { UserOutlined, AppstoreOutlined } from '@ant-design/icons'
import { getItem } from '../../utils';
import AdminUser from '../AdminUser/AdminUser';
import AdminProduct from '../AdminProduct/AdminProduct';
import Header from '../../components/header/Header';

const AdminPage = () => {
  const items = [
    getItem('Người dùng', 'user', <UserOutlined />),
    getItem('Sản phẩm', 'product', <AppstoreOutlined />),
  ];
  const [keySelected, setKeySelected] = useState('')

  const renderPage = (key) => {
    switch (key) {
      case 'user':
        return (
          <AdminUser />
        )
      case 'product':
        return (
          <AdminProduct />
        )
      default:
        return <></>
    }
  }

  const handleOnClick = ({ key }) => {
    setKeySelected(key)
  }
  return (
    <>
      <Header isHiddenSeries
        isHiddenMovies
        isHiddenPages
        isHiddenPricing
        isHiddenContact
        isHidensearch />
      <div style={{ display: 'flex' }}>
        <Menu
          mode="inline"
          style={{
            width: 256,
            boxShadow: '1px 1px 2px #ccc',
            height: '100vh',
          }}
          items={items}
          onClick={handleOnClick}
        />
        <div style={{ flex: 1, padding: '15px' }}>
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  )
}

export default AdminPage
