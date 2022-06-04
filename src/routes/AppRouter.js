import React from 'react'
import {Route , Routes} from 'react-router-dom'

import ListRequests from '../pages/ListRequests';
import ViewRequest from '../pages/ViewRequest';
import EditRequest from '../pages/EditRequest';

const AppRouter = () => {

    return (
        <div>
          <Routes>
            <Route exact path={'/'} element = {<ListRequests />}  />
            <Route path={'/viewRequest'} element={ <ViewRequest />}  />
            <Route path={'/editRequest'} element={ <EditRequest />}  />
            
            
            {/* <Route render={props => <NotImplemented {...props} />} /> */}
          </Routes>
        </div>
      );
    
}

export default AppRouter 