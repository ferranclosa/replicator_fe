import React , { useEffect, useState } from "react"
import CrudReplicator from "../connectors/CrudReplicator"
import { useLocation } from 'react-router-dom'


const ViewRequest = (props)=> 
{

    const location = useLocation()

    const [request , setRequest ] = useState({
        requestCode: '',
        requestDescription: '',
        sourceSystem: '',
        sourceURL: '',
        sourceUser: '',
        sourceCred: '',
        sourceSchema: '',
        sourceTempSchema: '',
        targetSystem: '',
        targetURL: '',
        targetUser: '',
        targetCred: '',
        targetDriver: '',
        targetSchema: '',
        targetDropBefore: false,
        tragetClearBefore: false,
        batchSize: 0
        
    })

    useEffect(() => {
        const data = {requestCode: location.state.requestCode}
     
        CrudReplicator.viewRequest(data )
        .then(response => 
         response.data.responseCode === '00'
             ? setRequest({...response.data}) 
             : setRequest({})
             )
    
    }, [])


    return (
        <>
        <h1>This is the View place Holder</h1>
        <code>
            {JSON.stringify(request)}
        </code>
        </>
        
        

    )
}

export default ViewRequest