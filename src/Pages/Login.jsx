import { Input, Spinner } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { json, useNavigate } from 'react-router-dom';
import { getAuth_Fun, getState_Fun } from '../Store/action';


export const Login = () => {
    const dispatch = useDispatch()
    const {token , authSucess, authLoading , authError} = useSelector((state)=> state);
    
    const [formData , setFormDta]=useState({username:'jeewan.thapa9@gmail.com', password:'tracknerd@123'});
    const navigate = useNavigate();

   const handleChange =(e)=>{
     let {username , password, value , name} = e.target;
      setFormDta({...formData , [name]:value})
    }
   
   
    const handleSubmit =async (e)=>{
     e.preventDefault();
     dispatch(getAuth_Fun(formData))
    }
   
    useEffect(()=>{
      if(authSucess){
        navigate("/home")
      }
    },[authSucess])

    if(authLoading) return <div><Spinner
    thickness='4px'
    speed='0.65s'
    emptyColor='gray.200'
    color='blue.500'
    size="xl"
    h="265"
    w="60"
  />
  <br />
  
  LIGINIG IN PLZ WAIT 
  </div>
    if(authError) return <div><Spinner
    thickness='4px'
    speed='0.65s'
    emptyColor='gray.200'
    color='blue.500'
    size="xl"
    h="265"
    w="60"
  />
  <br />
  
  OOPPS SOMETHING WENT WRONG CHECK FIREBASE CONNECTION
  </div>
  return (
    <div>
        <h1>SHOAIB PATEL</h1>
        <br />
        <div style={{padding:'30px'  , gap:'20px' , border:'2px solid lightgrey' , width:'fit-content', margin:'auto', borderRadius:'12px', paddingBottom:'15px'}}>
                <form onSubmit={(e)=> handleSubmit(e)} >
                    <Input w="s" m="10px" fontSize={'20px'} placeholder='Enter Name'
                        onChange={(e)=> handleChange(e)}
                        name="username"
                        value={formData.username}
                        type="email"
                    />
                    <br />
                    <Input w="s" m="10px" fontSize={'20px'} placeholder='Enter password'
                        onChange={(e)=> handleChange(e)}
                        name="password"
                        value={formData.password}
                        
                    />
                    <br />
                    <Input w="s" type="submit" bg="teal" color="white"/>
                </form>
               
                
        </div>
       

    </div>
  )
}
