import React, { useEffect, useState } from "react"
import CrudReplicator from "../connectors/CrudReplicator"
import { useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import { toast } from "react-toastify";
import Tools from '../helpers/Tools'
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box'
import FormGroup from "@mui/material/FormGroup";
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider';

const ViewRequest = (props) => {

    const location = useLocation()
    const navigate = useNavigate()



    const [request, setRequest] = useState({
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
        targetClearBefore: false,
        batchSize: 0
    })

    const [result, setResult] = useState()
    const formik = useFormik({
        initialValues: {
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
            targetClearBefore: false,
            batchSize: 0

        },
        enableReinitialize: true,
        initialTouched: false,

        onSubmit: values => {
            setResult(JSON.stringify(values, null, 2));
        },
        onReset: values => {
            setResult(JSON.stringify(values, null, 2));
        }
    });


    const deleteRequest = () => {
        const data = { requestCode: location.state.requestCode }
        CrudReplicator.deleteRequest(data)
            .then(response =>
                response.data.responseCode === '00'
                    ? (toast.info(Tools.buildToast(response.data)),
                        navigate(-1)
                    )
                    :
                    toast.error(Tools.buildToast(response.data))
            )
            .catch(e => {
                toast.error(e.getMessage())
            })
    }


    useEffect(() => {
        const data = { requestCode: location.state.requestCode }
        CrudReplicator.viewRequest(data)
            .then(response =>
                response.data.responseCode === '00'
                    ? (setRequest({ ...response.data }),
                        formik.setValues({ ...response.data }))
                    : setRequest({})
            )

    }, [])


    return (

        <>

            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, p: 1, minWidth: '30%', fontSize: '8px' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={formik.handleSubmit}
            >

                <div>
                    <TextField
                        id="requestCode"
                        name="requestCode"
                        sx={{ '& .MuiTextField-root': { width: '30%' }, }}
                        readOnly
                        label="Request Code"
                        value={formik.values.requestCode}
                        onChange={formik.handleChange}
                        error={formik.touched.requestCode && Boolean(formik.errors.requestCode)}
                        helperText={formik.touched.requestCode && formik.errors.requestCode}
                    />
                    <TextField
                        id="requestDescription"
                        name="requestDescription"
                        readOnly
                        label="Description"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.requestDescription}
                        error={formik.touched.requestDescription && Boolean(formik.errors.requestDescription)}
                        helperText={formik.touched.requestDescription && formik.errors.requestDescription}
                    />
                </div>
                <Divider sx={{ color: 'black', borderBottom: '2px solid' }} textAlign='right'>Source Section</Divider>
                <div>
                    <TextField
                        id="sourceSystem"
                        name="sourceSystem"
                        label="Source System"
                        readOnly
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.sourceSystem.toUpperCase()}
                    />
                    <TextField
                        id="sourceSchema"
                        name="sourceSchema"
                        label="Source Schema"
                        readOnly
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.sourceSchema.toUpperCase()}
                    />
                    <TextField
                        id="sourceTempSchema"
                        name="sourceTempSchema"
                        label="Source Temporary Schema"
                        readOnly
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.sourceTempSchema.toUpperCase()}
                    />
                </div>
                <div>

                    <TextField
                        id="sourceURL"
                        name="sourceTempSchema"
                        label="Source URL"
                        fullWidth
                        readOnly
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.sourceURL}
                    />
                </div>
                <Divider sx={{ color: 'black', pt: '5px' }} textAlign='right' >Target Section</Divider>

                <div>

                    <TextField
                        id="targetSystem"
                        name="targetSystem"
                        label="Target System"
                        
                        readOnly
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.targetSystem.toUpperCase()}
                    />
                    <TextField
                        id="targetSchema"
                        name="targetSchema"
                        label="Target Schema"
                        readOnly
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.targetSchema.toUpperCase()}
                    />
                    <TextField
                        id="targetDriver"
                        name="targetDriver"
                        label="Target Driver"
                        readOnly
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.targetDriver}
                    />
                </div>
                <div>
                    <TextField
                        id="targetURL"
                        name="targetURL"
                        label="Target URL"
                        readOnly
                        fullWidth
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.targetURL}
                    />
                </div>
                <div>
                    <FormGroup>
                        <FormControlLabel control={
                            <Switch
                                checked={formik.values.targetDropBefore ? true : false}
                                value={formik.values.targetDropBefore}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />} label="Drop Table Before" />
                        <FormControlLabel control={
                            <Switch
                                checked={formik.values.targetClearBefore ? true : false}
                                value={formik.values.targetClearBefore}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />} label="Clear Contents Before" />

                        <TextField
                            id="batchSize"
                            name="batchSize"
                            label="BatchSize"
                            readOnly
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.batchSize}
                        />
                    </FormGroup>
                </div>
                {location.state.deleteFlag ?
                    <div className="button-group">
                        <button
                            type='submit'
                            onClick={deleteRequest}>
                            Delete
                        </button>
                        <button type='button' onClick={() => navigate(-1)} >Cancel</button>
                    </div>
                    :
                    <div className="button-group">
                        <button type='button' onClick={() => navigate(-1)} >OK</button>
                    </div>
                }
            </Box>

        </>



    )
}

export default ViewRequest