import {  Table } from 'antd';
import React from 'react'
import Loading from '../../components/LoadingComponent/Loading';
import "./Table.css"

const TableComponent = (props) => {
    const { data = [], isLoading = false, columns = [] } = props
    // const { selectionType = 'checkbox', data = [], isLoading = false, columns = [] } = props

    // const rowSelection = {
    //     onChange: (selectedRowKeys, selectedRows) => {
    //         console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    //     },
    //     getCheckboxProps: (record) => ({
    //         disabled: record.name === 'Disabled User',
    //         // Column configuration not to be checked
    //         name: record.name,
    //     }),
    // };
    return (
        <Loading isLoading={isLoading}>
        <Table
            // rowSelection={{
            //     type: selectionType,
            //     ...rowSelection,
            // }}
            columns={columns}
            dataSource={data}
            {...props}
        />
        </Loading>
    )
}

export default TableComponent
