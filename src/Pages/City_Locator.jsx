import { Spinner } from '@chakra-ui/react';
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { get_City_Func } from '../Store/action';

export const City_Locator = ({current_city_sucess , id}) => {
    console.log(current_city_sucess ,' current_city_sucess' , id , 'is valuue of id ')
    const {vehicalList , current_city_location_LAT_LONG ,  current_city_loading , current_city_error} = useSelector((state)=> state);
      console.log(current_city_location_LAT_LONG , ' current_city_location_LAT_LONG')
    const Currrnet_Vehical_Data = vehicalList.filter((elem , ind)=> `:${ind}` == id)
    const dispatch = useDispatch();
    const [currentLocation , setCurrentLocation]=useState({});
    // const getData =()=>{
    //     axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${current_city_sucess}&appid=c0d290eeee9dd399b017a6d2ba64be7e&units=metric`)
    //     .then(( Data ) => {
    //         console.log(Data.data.coord)
    //         setCurrentLocation({...Data.data.coord})
    //       }).catch((er)=>{
    //         console.log(er)
    //       })
    //   }

    useEffect(()=>{
        dispatch(get_City_Func(current_city_sucess));
    },[])
 if(current_city_loading) return <div><Spinner
thickness='4px'speed='0.65s' emptyColor='gray.200'color='blue.500'
size="xl"h="265" w="60"/>
<br />

 API FETCHING DATA ID LOADING PLZ WAIT
</div>
if(current_city_error) return <div><Spinner
thickness='4px'speed='0.65s'emptyColor='gray.200'
color='blue.500' size="xl" h="265" w="60"/>
<br />
 OOPPS SOMETHING WENT WRONG CHECK FIREBASE CONNECTION </div>
  return (
    <div style={{border:'25px solid lightgrey' , width:'100%' , margin:"auto" , height:'100%', display:'grid' , gridTemplateColumns:'repeat(2,1fr)' , borderRadius:'8px'}}>
      <div style={{border:'2px solid lightgrey' , width:'100%' , margin:"auto" , height:'100%',}}>
       {
          current_city_location_LAT_LONG ? Currrnet_Vehical_Data.map((elem)=>(
            <div style={{fontSize:'20px' }}>
                  <p  style={{fontSize:'25px', fontWeight:'bold'}}>ID : {elem.id}{" : "}  Vehical_Type : {elem.type}  </p>
                     <br />
                     <p  style={current_city_sucess ? {color:'green'} : {color:'red'}}>    present City :
                         { current_city_sucess ?  current_city_sucess : " Suspended Vehical "} 
                         {currentLocation.lat != undefined ? `at lat : ${currentLocation.lat}` : null}
                         {currentLocation.lat != undefined ? ` & long : ${currentLocation.lon}` : null} </p>
                  <br />
                  <div style={{display:'flex' , flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'justify'}}>
                       <p> immobilizer : {elem.immobilizer}</p>
                       <p>fuelDataSource : {elem.fuelDataSource}</p>
                       <p>trialEndDate : {elem.trialEndDate}</p>
                       <p>Rgd Num : {elem.registrationNumber}</p>
                       <p style={elem.status =="online "? {color:'green' , fontSize:'25px'} : {color:'red', fontSize:'25px'}}>Status : {elem.status}</p>
                       <p>Date: {elem.installationDate}</p>
                       <p> Fule-Source : {elem.fuelDataSource}</p>
                  </div>
            </div>
        ))  : null 
       } 
      

      </div>
    <div>
       
         <iframe
                id="iframeId"
                title="my-map"
                src={`https://maps.google.com/maps?q=${current_city_location_LAT_LONG.lat},${current_city_location_LAT_LONG.lon}&hl=es;&output=embed`}
                height="100%"
                width="100%"
      ></iframe> 
   </div>
    
    </div>
  )
}
