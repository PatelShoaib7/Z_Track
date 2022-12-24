import { Button, Input, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { json, useNavigate } from 'react-router-dom';
import {  getDATA_Fun, log_out_Fun } from '../Store/action';
export const Home = () => {
  const {data , log_out ,  dataError , dataLoading , dataSucess ,vehicalList} = useSelector((state)=> state)
 
  const token= JSON.parse(localStorage.getItem("TOKEN"));
 const [serchINP , setSeracINP]=useState('');
 const [showData , setSHOWdata]=useState([]);
 //console.log(vehicalList,'vehicalList  is')
 const navigate = useNavigate()
const dispatch = useDispatch();
const habndleSearch =(e)=>{
  let val = e.target.value;
  setSeracINP(val)
  handleCLick(val)
}
const handleCLick =(val)=>{
      const upDtaedData = data.filter((elem , i)=>{
        if(elem.organisation.id== val || elem.organisation.GST[0] == val ||
           elem.organisation.PAN == val || elem.city == val  || elem.organisation.GST == val || elem.organisation.city == val ){
          return {
            ...elem
          }
        }
      })
      setSHOWdata(upDtaedData)
}
const handleLogOut =()=>{
  log_out_Fun(dispatch)
}
const hanldeCLear =()=>{
   setSeracINP(' ')
  setSHOWdata([])
}
 const goToLocation =(e)=>{
  let id = e.target.value;
  navigate(`/location/:${id}`)
}
// console.log(showData , 'showData value ')
useEffect(() => {
  dispatch(getDATA_Fun(token));
  if(!token){
   return  navigate("/")
  }
}, [showData , token]);
//console.log(vechileData,"vechileData")
if(dataLoading) return <div><Spinner
thickness='4px'speed='0.65s' emptyColor='gray.200'color='blue.500'
size="xl"h="265" w="60"/>
<br />

API FETCHING DATA ID LOADING PLZ WAIT
</div>
if(dataError) return <div><Spinner
thickness='4px'speed='0.65s'emptyColor='gray.200'
color='blue.500' size="xl" h="265" w="60"/>
<br />

OOPPS SOMETHING WENT WRONG CHECK FIREBASE CONNECTION
</div>

  return (
    <div >




       <Button onClick={handleLogOut} color='white' bg="red" >LOG OUT</Button>
       <div  style={{borderTop:'2px solid lightgrey' , width:'auto',
                      marginTop:'50px' , marginBottom:'0.5rem' , margin:'1rem' }}>
     




          <div style={{ marginBottom:'rem'}}>
                <Input w="sm" placeholder='Enter Register Number' name="name" 
                       value={serchINP}  mt="2rem" mr="0.5rem"/>
               <Button onClick={hanldeCLear} bg="teal" color='white' fontSize={'20px'}>CLAER </Button>
           </div>
           <br />
      



           <div style={{border:'2px ',borderRadius:'12px', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'30px'
                   ,width:'fit-content', margin:"auto"  }}>
                 {
                  showData.length ?  showData.map((elem, i)=>(
                    <div  style={{border:'2px solid lightgrey', borderRadius:'12px' , width:'fit-content' , fontSize:'19px'}}>
                          <div >
                          <p style={{fontSize:'25px'}}>{elem.id}{" : "}   {elem.type}  </p>
                               <p>Name  : {elem.organisation.name}</p>
                              <p>Eamil  : {elem.organisation.email}</p>
                              <p>Phone  : {elem.organisation.phone}</p>
                              <p>phoneVerified Status : {elem.organisation.phoneVerified ? "true" :"false"}</p>
                              <p> GST : : {elem.organisation.GST}</p>
                              <p>model : {elem.organisation.PAN}</p>
                              <p>City : {elem.organisation.city} {" "} State: {elem.organisation.state}</p>
                           <br />
                           
                         </div> 
                     </div>
                  )) : null
}
      </div>
         <br />
      <div style={{border:'2px ',borderRadius:'12px', display:'grid', gridTemplateColumns:'repeat(3,1fr)'
                   ,width:'fit-content', margin:"auto" ,gap:'0.5rem'  }}
    >
      
         {
                vehicalList.map((elem, id)=>(
                  <div style={{border:'2px solid lightgrey' , borderRadius:'12px' }}>
                       <p style={{fontSize:'25px'}}>{elem.id}{" : "}   {elem.type}  </p>
                       <p> immobilizer : {elem.immobilizer}</p>
                       <p>model : {elem.model}</p>
                       <p>Barnd : {elem.note}</p>
                       <p>Rgd Num : {elem.registrationNumber}</p>
                       <p>Status : {elem.status}</p>
                       <p>Date: {elem.installationDate}</p>
                       <p> Fule-Source : {elem.fuelDataSource}</p>
                       <br />
                       <Button value={id} colorScheme={'whatsapp'}  onClick={(e)=>goToLocation(e)} >GoTo Location</Button>
                         

                  </div>
                ))
         }
      
      </div>
      </div>
    </div>
  )
}
