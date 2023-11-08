import React, { useState } from 'react'
import TableComponent from '../../components/TableComponent/TableComponent'
import { WrapperHeader } from './style'
import { Button, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import * as ProductService from '../../services/ProductService'

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('');

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct()
    console.log('res', res)
  }

  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      <div style={{ marginTop: '10px' }}>
        <Button
          style={{
            height: '150px',
            width: '150px',
            borderRadius: '6px',
            borderStyle: 'dashed',
          }} onClick={() => setIsModalOpen(true)}>
          <PlusOutlined style={{ fontSize: '60px' }} /></Button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <TableComponent />
      </div>
      <Modal title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  )
}

export default AdminProduct
