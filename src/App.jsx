import { useState , useEffect} from 'react'
import config from '../config/config';
import  authservice from './appwrite/auth';
import {useDispatch} from "react-redux"
import { logout , login } from './store/authSlice';
import {Outlet} from "react-router-dom"
import {Header , Footer} from "./components"
function App() {
  const [loading, setloading] = useState(true)
  const dispatch = useDispatch();
  //console.log(config.appwriteurl);
  useEffect(() => {

    authservice.getcurrentuser()
    .then((userData)=>{
      if (userData) {
        dispatch(login(userData))
      }
      else{
        dispatch(logout());
      }
    })
    .finally(()=>setloading(false));
    

  }, [])
  
  return loading ? (
    <> 
      <div>loading</div>
    </>
  ) : (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  </div>
  )
}


export default App
