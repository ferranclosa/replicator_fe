import React, { useEffect, useState } from "react"
import CrudReplicator from "../connectors/CrudReplicator"
import { useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';



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
        tragetClearBefore: false,
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
            tragetClearBefore: false,
            batchSize: 0

        },
        enableReinitialize: true,
        initialTouched: false,
        validationSchema: Yup.object({
            requestCode: Yup.string()
                .max(5, 'Must be 5 characters or less')
                .required('Request Code is a required value'),
            requestDescription: Yup.string()
                .max(100, 'Must be 100 characters or less')
                .required('Description is a requierd value'),
            sourceSystem: Yup.string()
                .required('Source System has to be specified'),
            sourceURL: Yup.string()
                .required('The Source URL address is required'),
            sourceSchema: Yup.string()
                .required(' Source Schema is required'),
            sourceTempSchema: Yup.string()
                .required('Source Temp Schema (usually QTEMP) is required'),


        }),
        onSubmit: values => {
            setResult(JSON.stringify(values, null, 2));
        },
        onReset: values => {
            setResult(JSON.stringify(values, null, 2));
        }
    });


    useEffect(() => {
        const data = { requestCode: location.state.requestCode }

        CrudReplicator.viewRequest(data)
            .then(response =>
                response.data.responseCode === '00'
                    ? (setRequest({ ...response.data }), 
                    formik.setValues({...response.data}))
                    : setRequest({})
            )

    }, [])


    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="requestCode">Request Code</label>
                <input
                    id="requestCode"
                    name="requestCode"
                    type="text"
                    readOnly
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.requestCode}
                />
                {formik.touched.requestCode && formik.errors.requestCode ? (
                    <div className='field-error'>{formik.errors.requestCode}</div>
                ) : null}

                <label htmlFor="requestDescription">Description</label>
                <input
                    id="requestDescription"
                    name="requestDescription"
                    type="text"
                    readOnly
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.requestDescription}
                />
                {formik.touched.requestDescription && formik.errors.requestDescription ? (
                    <div className='field-error'>{formik.errors.requestDescription}</div>
                ) : null}
              <label htmlFor="sourceSystem">Source System</label>
                <input
                    id="sourceSystem"
                    name="sourceSystem"
                    type="text"
                    readOnly
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.sourceSystem.toUpperCase()}
                />
                {formik.touched.sourceSystem && formik.errors.sourceSystem ? (
                    <div className='field-error'>{formik.errors.sourceSystem}</div>
                ) : null}
            <label htmlFor="sourceSchema">Source Schema</label>
                <input
                    id="sourceSchema"
                    name="sourceSchema"
                    type="text"
                    readOnly
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.sourceSchema.toUpperCase()}
                />
                {/* {formik.touched.sourceSystem && formik.errors.sourceSystem ? (
                    <div className='field-error'>{formik.errors.sourceSystem}</div>
                ) : null} */}
                <label htmlFor="sourceTempSchema">Source Temporary Schema</label>
                <input
                    id="sourceTempSchema"
                    name="sourceTempSchema"
                    type="text"
                    readOnly
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.sourceTempSchema.toUpperCase()}
                />
                <label htmlFor="sourceURL">Source URL</label>
                <input
                    id="sourceURL"
                    name="sourceTempSchema"
                    type="text"
                    readOnly
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.sourceURL}
                />
              <label htmlFor="targetSystem">Target System</label>
                <input
                    id="targetSystem"
                    name="targetSystem"
                    type="text"
                    readOnly
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.targetSystem.toUpperCase()}
                />
              <label htmlFor="targetURL">Target URL</label>
                <input
                    id="targetURL"
                    name="targetURL"
                    type="text"
                    readOnly
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.targetURL}
                />
              <label htmlFor="targetDriver">Target URL</label>
                <input
                    id="targetDriver"
                    name="targetDriver"
                    type="text"
                    readOnly
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.targetDriver}
                />
              <label htmlFor="targetSchema">Target Schema</label>
                <input
                    id="targetSchema"
                    name="targetSchema"
                    type="text"
                    readOnly
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.targetSchema.toUpperCase()}
                />
              <label htmlFor="targetDropBefore">Drop Table Before</label>
                <input
                    id="targetDropBefore"
                    name="targetDropBefore"
                    type="checkbox"
                    readOnly
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.targetDropBefore}
                />
              
                {result ?
                    <code>
                        {result}
                    </code>

                    : null}
                <div className="button-group">
                    <button type="submit" onClick={() => navigate(-1)}>OK</button>
                    {/* <button type='button' onClick={formik.resetForm}>Clear</button> */}
                </div>
            </form>
        </>



    )
}

export default ViewRequest