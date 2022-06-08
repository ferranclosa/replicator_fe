
const buildToast = (idto) => {
    const dto = {...idto}
    const jsxResponse = 
        <div> {dto.responseCode} {dto.responseMessage} <br/>
            {dto.messageList.map(element => 
              (<div> {element} <br/> </div>)  
            )}
        </div>
    return  jsxResponse
}


export default
{
    buildToast, 
    
}