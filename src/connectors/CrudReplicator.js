import axios from 'axios'


const URL = 'http://localhost:8282/crud/v1'

let headers ={
    'Content-Type': 'application/json',
    'Accept': '*/*',
    'Access-Control-Allow-Origin': '*'
}

const getRequests = () => {
    return  axios.get(URL + '/listRequests', headers)
}

const viewRequest = (data) => {
    return axios.post(URL + '/readRequest', data , {headers})
}

const deleteRequest = (data) => {
    return axios.post(URL + '/deleteRequest', data , {headers})
}

export default
{
    getRequests, 
    viewRequest,
    deleteRequest, 

}