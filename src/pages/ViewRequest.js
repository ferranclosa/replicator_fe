import React, { useEffect, useState } from "react"
import CrudReplicator from "../connectors/CrudReplicator"
import { useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import { toast } from "react-toastify";
import Tools from '../helpers/Tools'
import { toBeEmpty } from "@testing-library/jest-dom/dist/matchers";

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
            </form>
        </>



    )
}

export default ViewRequest