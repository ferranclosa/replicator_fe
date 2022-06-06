import * as React from 'react'
import AppRouter from './routes/AppRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
      <body >
           <ToastContainer
                        autoClose={3000}
                        position="top-right"
                        newestOnTop
                        
                        closeOnClick
                        pauseOnHover
                        pauseOnFocusLoss
                        rtl={false}
                        draggable
                           style={{
                          width: "auto"}
                         }

                    />
                 
        <AppRouter/>
      </body>

    

  );
}

export default App;
