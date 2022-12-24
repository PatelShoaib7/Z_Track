import { Button, FormErrorIcon, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { getDATA_Fun } from '../Store/action';
import { City_Locator } from './City_Locator';

///v1/gofences
export const Location = () => {
  const {data , log_out ,  dataError , dataLoading , dataSucess ,vehicalList , current_city_sucess} = useSelector((state)=> state)
//c0d290eeee9dd399b017a6d2b4be7e
   console.log(current_city_sucess , ' current_city_sucess VALUE ')
  let token =JSON.parse(localStorage.getItem("TOKEN"));
  const [long_Lat , setLongLat]=useState({})
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
useEffect(()=>{
 
    dispatch(getDATA_Fun(token , id ))
  
 },[dispatch])


if(dataLoading) return <div><Spinner
thickness='4px'speed='0.65s' emptyColor='gray.200'color='blue.500'
size="xl"h="265" w="60"/>
<br />

API FETCHING DATA ID LOADING PLZ WAIT
</div>
if(dataError) return <div><Spinner
thickness='4px'speed='0.65s'emptyColor='gray.200'
color='blue.500' size="xl" h="265" w="60"/>


OOPPS SOMETHING WENT WRONG CHECK FIREBASE CONNECTION </div>
  return (

    <div>
      <h1>Location page</h1>
        <Button onClick={()=> navigate("/home")} >Go To Home</Button>
        <br />
        <div style={{border:'2px sol ', width:'fit-content' , margin:'auto', height:'auto' , marginTop:'30px'}}>
       <City_Locator current_city_sucess={current_city_sucess} id={id}/>
       </div>
    </div>
  )
}
