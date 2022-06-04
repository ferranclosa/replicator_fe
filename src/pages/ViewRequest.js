import React , { useEffect, useState } from "react"
import CrudReplicator from "../connectors/CrudReplicator"


const ViewRequest = (props)=> 
{
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
        const data = {requestCode: props.requestCode}
     
        CrudReplicator.viewRequest(data )
        .then(response => 
         response.data.responseCode === '00'
             ? setRequest({...response.data}) 
             : setRequest({})
             )
    
    }, [props.requestCode])


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