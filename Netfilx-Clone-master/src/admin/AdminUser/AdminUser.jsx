import React, { useEffect, useRef } from 'react'
import { WrapperHeader } from './style'
import TableComponent from '../../components/TableComponent/TableComponent';
import DrawerComponent from '../../components/DrawerComponent/DrawerComponent'
import { useState } from 'react';
import Loading from '../../components/LoadingComponent/Loading';
import { Button, Form, Space, Modal } from 'antd';
import InputComponent from '../../components/InputComponent/InputComponent'
import * as UserService from '../../services/userStore'
import { updateUser } from '../../services/userStore';
import { deleteUser } from '../../services/userStore';
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined , InfoCircleOutlined} from '@ant-design/icons'


const AdminUser = () => {
    const [rowSelected, setRowSelected] = useState('');
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const searchInput = useRef(null);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);
    const [users, setUsers] = useState([]);
    const [selectedAll, setSelectedAll] = useState(false);
    
    

    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
        isAdmin: false,
    });

    const [form] = Form.useForm();

    
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

    const handleDetailsProduct = (record) => {
        setIsOpenDrawer(true);
    
        // Thiết lập trạng thái
        setStateUserDetails({
            name: record.name,
            email: record.email,
            phone: record.phone,
            isAdmin: record.isAdmin,
        });
    
        // Sử dụng phương thức setFieldsValue của form để cập nhật các trường form
        form.setFieldsValue({
            name: record.name,
            email: record.email,
            phone: record.phone,
            isAdmin: record.isAdmin,
        });
    };

    const renderAction = (text, record) => (
        <div>
            <InfoCircleOutlined 
            style={{ color: 'blue', fontSize: '28px', cursor: 'pointer', paddingRight: '10px' }}
            onClick={() => handleDetailsProduct(record)}
            />
            <DeleteOutlined
                style={{ color: 'red', fontSize: '28px', cursor: 'pointer' }}
                onClick={() => confirmDelete(() => handleDeleteUser(record))}
            />
        </div>
    );

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
    };

    const handleReset = (clearFilters) => {
        clearFilters();
    };

    const handleFinish = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        try {
            setIsLoadingUpdate(true);
    
            // Gọi hàm updateUser với thông tin cần cập nhật
            await updateUser(rowSelected, stateUserDetails, user.access_token);
    
            // Cập nhật lại danh sách người dùng sau khi cập nhật thành công
            const updatedUsers = await getAllUsers();
            setUsers(updatedUsers.data);
    
            setIsLoadingUpdate(false);
            setIsOpenDrawer(false); // Đóng drawer sau khi cập nhật thành công hoặc thất bại
        } catch (error) {
            console.error('Error updating user:', error);
            setIsLoadingUpdate(false);
            // Xử lý lỗi nếu cần
        }
    };

    const handleDeleteUser = async (record) => {
        const user = JSON.parse(localStorage.getItem("user"));
        try {
            // Gọi hàm deleteUser với ID của người dùng và token
            await deleteUser(record._id, user.access_token);
    
            // Cập nhật lại danh sách người dùng sau khi xóa thành công
            const updatedUsers = await getAllUsers();
            setUsers(updatedUsers.data);
        } catch (error) {
            console.error('Error deleting user:', error);
            // Xử lý lỗi nếu cần
        }
    };
    

    const confirmDelete = (onOk) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc chắn muốn xóa?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk,
        });
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

    const handleOnchangeDetailss = (e) => {
        if (e.target.name === 'selection') {
            // Handle the "Select All" checkbox
            setSelectedAll(e.target.checked);
            // Select or deselect all rows based on the checkbox state
            const selectedRows = e.target.checked ? users.map(user => user._id) : [];
            setRowSelected(selectedRows);
        } else {
            setStateUserDetails({
                ...stateUserDetails,
                [e.target.name]: e.target.value
            });
        }
    };

    const selectionColumn = {
        title: (
            <input
                type="checkbox"
                onChange={handleOnchangeDetailss}
                checked={selectedAll}
                name="selection"
            />
        ),
        dataIndex: 'selection',
        render: (_, record) => (
            <input
                type="checkbox"
                onChange={() => {
                    // Handle selection logic here
                    setRowSelected(record._id);
                }}
                checked={selectedAll || rowSelected.includes(record._id)}
            />
        ),
    };

    
    
      
      // Add the selection column to the columns array
    const updatedColumns = [selectionColumn, ...columns];


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
                <TableComponent columns={updatedColumns} isLoading={isLoadingUsers} dataSource={users} onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            setRowSelected(record._id)
                        }

                    };
                }} />
            </div>
            <DrawerComponent title='Chi tiết người dùng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
                <Loading isLoading={isLoadingUpdate}>
                    <Form
                        name="basic"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 22 }}
                        onFinish={handleFinish}
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
            </DrawerComponent>
        </div>
    )
}

export default AdminUser