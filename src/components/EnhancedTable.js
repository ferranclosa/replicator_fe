import {useEffect, useState} from 'react'

import MaUTable from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import {  useTable, useRowSelect } from 'react-table'
import uuid from 'uuid'




const  EnhancedTable = ({columns , data, setSelectedRows, ...props}) => {

    
    const {
        getTableProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows
    } = useTable({
            columns,
            data,
            initialState: {
                hiddenColumns: 'id'
             }
        }, useRowSelect
    )

    useEffect(() =>{
        setSelectedRows(selectedFlatRows.map(row => row.original))
    },[setSelectedRows, selectedFlatRows])

    return (
        <TableContainer justify='flex-start' spacing={1} >
            <MaUTable {...getTableProps()} size='small' >
                <TableHead>
                    {headerGroups.map(headerGroup => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <TableCell >
                                    {column.render('Header')}
                                    {column.id !== 'selection' ? (
                                        <TableSortLabel active={column.isSorted}
                                                        direction={column.isSortedDesc ? 'desc' : 'asc'}/>
                                    ) : null }
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody>
                    {rows.map((row, i ) => {
                        prepareRow(row)
                        return (
                            <TableRow
                                {...row.getRowProps()}
                                style={i %2 ? {bakground: 'ligh-grey'} : {background: 'white'}}
                                key={i}>
                                {row.cells.map(cell => {
                                    return (
                                        <TableCell headers={{...cell.getCellProps()}}>
                                            {cell.render('Cell')}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </MaUTable>
        </TableContainer>
    )
}
export default EnhancedTable