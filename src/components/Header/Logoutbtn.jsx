import React from 'react'
import { logout  } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import authservice from '../../appwrite/auth'
function Logoutbtn() {
    const dispatch = useDispatch();
    const logouthandler = ()=>{
       authservice.signout()
                  .then(
                    ()=>{
                        dispatch(logout())
                    })
    }
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logouthandler}
    >Logout</button>
  )
}

export default Logoutbtn