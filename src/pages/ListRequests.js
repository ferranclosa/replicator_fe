
import {useState, useEffect, useMemo}  from 'react'
import CrudReplicator from '../connectors/CrudReplicator'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import EnhancedTable from '../components/EnhancedTable'
import { IconButton } from '@mui/material'
import { Edit } from '@mui/icons-material'
import { Delete } from '@mui/icons-material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function ListRequests() {

    const navigate = useNavigate()
    const [selectedRows, setSelectedRows] = useState([]);
  
    const [requests, setRequests] = useState([]);


    const columns = useMemo(
        () => [
            { Header: 'Code', accessor: 'requestCode' },
            { Header: 'Description', accessor: 'requestDescription' },
            { Header: 'Source System', accessor: 'sourceSystem' },
            { Header: 'Source Schema', accessor: 'sourceSchema' },

            { Header: 'Target System', accessor: 'targetSystem' },
            { Header: 'Target Schema', accessor: 'targetSchema' },
            {
                Header: 'Delete',
                id: 'delete',
                Cell: ({ row }) => (
                    <div>
                        <IconButton {...row.getToggleRowSelectedProps()} onClick={() => deleteHandler(row)}>
                            <Delete fontSize="small" />
                        </IconButton>
                    </div>
                ),
            },

            {
                Header: 'Edit',
                id: 'edit',
                Cell: ({ row }) => (
                    <div>
                        <IconButton {...row.getToggleRowSelectedProps()} onClick={() => editHandler(row)}>
                            <Edit fontSize="small" />
                        </IconButton>
                    </div>
                ),
            },

            {
                Header: 'Details',
                id: 'view',
                Cell: ({ row }) => (
                    <div>
                        <IconButton {...row.getToggleRowSelectedProps()}
                            onClick={() => viewHandler(row)}>
                            <MoreHorizIcon fontSize="small" />
                        </IconButton>
                    </div>
                ),
            },
        ],
        []
    );


    useEffect(() => {
        CrudReplicator.getRequests()
            .then(response =>
                response.data.responseCode === '00'
                    ? setRequests(response.data.requestList)
                    : ( setRequests([]), 
                    toast.info("Empty data set"))
            )
            .catch(e => {
                toast.error(e.getMessage())
            })
    
    }, []
    )


    const deleteHandler = (row) => {
            navigate('/viewRequest', { state: { requestCode: row.original.requestCode, deleteFlag: true } })
    }

    const editHandler = (row) => {
        navigate('/editRequest', { state: {requestCode: row.original.requestCode}})

    }

    const viewHandler = (row) => {
        navigate('/viewRequest', { state: { requestCode: row.original.requestCode, deleteFlag: false } })
    }

    return (
        <div className="table" >
            {requests.length > 0 ? (
                <EnhancedTable
                    columns={columns}
                    data={requests} 
                    setSelectedRows={setSelectedRows}
                    
                    />
            )

                : <label> Empty Table! </label>}

        </div>
    );
}

export default ListRequests;