import React, { useEffect, useRef } from 'react'
import { WrapperHeader } from './style'
import TableComponent from '../../components/TableComponent/TableComponent';
import DrawerComponent from '../../components/DrawerComponent/DrawerComponent'
import { useState } from 'react';
import Loading from '../../components/LoadingComponent/Loading';
import { Button, Form, Space } from 'antd';
import InputComponent from '../../components/InputComponent/InputComponent'
import * as UserService from '../../services/userStore'
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons'


const AdminUser = () => {
    const [ setRowSelected] = useState('');
    const [ setIsOpenDrawer] = useState(false);

    const [setIsModalOpenDelete] = useState(false);
    const searchInput = useRef(null);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);
    const [users, setUsers] = useState([]);

    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
        isAdmin: false,
    });
    
    const getAllUsers = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await UserService.getAllUser(user?.access_token)
        console.log('res', res)
        return {data: res?.data, key: 'users'}
      }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllUsers();
                setUsers(response.data);
                setIsLoadingUsers(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setIsLoadingUsers(false);
            }
        };
        fetchData();
    }, []);

    const handleDetailsProduct = () => {
        setIsOpenDrawer(true)
    }

    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '28px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
            </div>
        )
    }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
    };

    const handleReset = (clearFilters) => {
        clearFilters();
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <InputComponent
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        // render: (text) =>
        //   searchedColumn === dataIndex ? (
        //     <Highlighter
        //       highlightStyle={{
        //         backgroundColor: '#ffc069',
        //         padding: 0,
        //       }}
        //       searchWords={[searchText]}
        //       autoEscape
        //       textToHighlight={text ? text.toString() : ''}
        //     />
        //   ) : (
        //     text
        //   ),
    });

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name'), //search name
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: 'Admin',
            dataIndex: 'isAdmin',
            render: (isAdmin) => (isAdmin ? 'TRUE' : 'FALSE'),
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: (a, b) => a.phone - b.phone,
            ...getColumnSearchProps('phone'),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction,
        },
    ];


    const handleOnchangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <WrapperHeader>Quản lý người dùng</WrapperHeader>
            <div style={{ marginTop: '20px' }}>
                <TableComponent columns={columns} isLoading={isLoadingUsers} dataSource={users} onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            setRowSelected(record._id)
                        }

                    };
                }} />
            </div>
            {/* <DrawerComponent title='Chi tiết người dùng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
                <Loading isLoading={isLoadingUpdate}>
                    <Form
                        name="basic"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 22 }}
                        onFinish={onUpdateUser}
                        autoComplete="off"
                        form={form}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <InputComponent value={stateUserDetails.name} onChange={handleOnchangeDetails} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <InputComponent value={stateUserDetails.email} onChange={handleOnchangeDetails} name="email" />
                        </Form.Item>
                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your count phone!' }]}
                        >
                            <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 19, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Apply
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent> */}
        </div>
    )
}



export default AdminUser
