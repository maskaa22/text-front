import './Users.css';
import {useTable} from "react-table";
import React, {useState} from "react";
import Update from "../update/Update";


export default function Users ({items})
{
    const [ update, setUpdate ] = useState([]);

    function Table ({columns, data}) {
        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow,
        } = useTable({columns, data})
        return (
            <table {...getTableProps()} >
                <thead>
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render('Header')}
                                    </th>))
                            }
                        </tr>
                    ))
                }
                </thead>
                <tbody {...getTableBodyProps()}>
                {
                    rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr
                                onClick={() =>
                            {
                                setUpdate(row.values)
                                viewDiv()
                            }}
                                {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'USERNAME',
                accessor: 'username',
            },
            {
                Header: 'FIRST NAME',
                accessor: 'first_name',
            },
            {
                Header: 'LAST NAME',
                accessor: 'last_name',
            },
            {
                Header: 'EMAIL',
                accessor: 'email',
            },
            {
                Header: 'TYPE',
                accessor: 'user_type',
            }
        ],
        []
    );

    const data = items.map(val=>({
    username: val.username,
    first_name: val.first_name,
    last_name: val.last_name,
    email: val.email,
    user_type: val.user_type
}));

    function viewDiv(){
        document.getElementById("div2").style.display = "block";
    }

    return(
        <div className={'flex-up'}>
            <div className={'bob'}>
                <div className={'userList'}>
                    <Table columns={columns} data={data} />
                </div>
            </div>
            <div id={"div2"} className={'updateUser'}><Update update={update}/></div>
        </div>
    );
};
