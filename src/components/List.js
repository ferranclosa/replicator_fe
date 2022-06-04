
import * as React  from 'react'
import TableInstance from "./TableInstance";
import EnhancedTable from './EnhancedTable'
import {useMemo} from "react";

function List() {

    const columns = useMemo(
        () => [
            { Header: 'Id', accessor: 'id' },
            { Header: 'Code', accessor: 'mfCode' },
            { Header: 'Description', accessor: 'mfDescription' },
            { Header: 'Route', accessor: 'mfRoute' },
            { Header: 'Label', accessor: 'mfLabel' },
            { Header: 'Sort Order', accessor: 'mfSortBy' },
            { Header: 'Active Status', accessor: 'mfActive',
                Cell: ({ row }) => (row.original.mfActive ? 'Active' : 'Inactive') },

        ],
        []
    );

    const data = useMemo(
        () => [
            { id: 1, mfCode:'HUB',
                mfDescription:'HSBC Universal Banking',
                mfRoute:'_route_1',
                mfLabel:'HUB_TEST',
                mfSortBy:'name', mfActive: true },
            { id: 2, mfCode:'ADM',
                mfDescription:'Automatic Drawing Machine',
                mfRoute:'_route_2',
                mfLabel:'ADM_TEST',
                mfSortBy:'id', mfActive: false },
            { id: 3, mfCode:'HIE',
                mfDescription:'HUB Import and Export Module',
                mfRoute:'_route_3',
                mfLabel:'HIE_TEST',
                mfSortBy:'product', mfActive: true },
            { id: 4, mfCode:'ADE',
                mfDescription:'Asset Distribution Engine',
                mfRoute:'_route_4',
                mfLabel:'ADE_TEST',
                mfSortBy:'product', mfActive: true },
            { id: 5, mfCode:'SCF',
                mfDescription:'Supply Chain Financing',
                mfRoute:'_route_8',
                mfLabel:'SCF_TEST',
                mfSortBy:'currency', mfActive: true },
        ], []
    )

    return (
        <div className="table" >

                <TableInstance

                    columns={columns}
                    data={data}/>
                <EnhancedTable
                    columns={columns}
                    data={data}>
                </EnhancedTable>

        </div>
    );
}

export default List;