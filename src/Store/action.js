import { AUTH_ERROR, AUTH_LOADING, AUTH_SUCESS, GET_CURRENT_CITY, GET_CURRENT_CITY_ERROR, GET_CURRENT_CITY_LOADING, GET_DATA_ERROR, GET_DATA_LOCADING, GET_DATA_SUCEEFUL, LOG_OUT, LOG_OUT_LOADING } from "./action.types"
import axios from 'axios';



export const getDATA_Fun =(token ,id)=> (dispatch)=> {
             dispatch({type:GET_DATA_LOCADING})
           
                axios.get('https://staging-api.tracknerd.io/v1/vehicle-groups/vehicles', {
            headers: {
                'Authorization': `Bearer ${token}` }
            }) .then(( data ) => {
              const Data_To_Send = data.data.data;
              let city;
              if(id){
              const upDatedCity =  Data_To_Send.filter((elem ,index) => `:${index}` == id)
              city = upDatedCity ?  upDatedCity[0].organisation.city : "pune"
                console.log(city , 'city ')
              }
             
              //console.log(data.data.data ,'data dtat is')

            dispatch({type:GET_DATA_SUCEEFUL , payload:Data_To_Send , city:city})
          })
          .catch((error) => {
            dispatch({type:GET_DATA_ERROR})
          });
      }
export const getAuth_Fun =  (payload )=>  (dispatch)=>{
    // console.log(payload)
    dispatch({type:AUTH_LOADING})
    axios.post("https://staging-api.tracknerd.io/v1/auth/login",payload )
    .then((res) => {
        console.log(res.data)
        let token = res.data.token
      dispatch({type:AUTH_SUCESS , payload:token});
      
    })
    .catch(() => {
      dispatch({type:AUTH_ERROR});
    });
}


export const log_out_Fun =(dispatch)=>{
 dispatch({type:LOG_OUT_LOADING})
 setTimeout(()=>{
  dispatch({type:LOG_OUT})
 },[1000])

}

export const get_City_Func =(city )=> (dispatch)=>{
  console.log(city)
   dispatch({type:GET_CURRENT_CITY_LOADING})
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c85e6c535afb5d9e8ca5b4c7b17c58c4&units=metric`)
    .then(( Data ) => {
           const lat_long_Obj =  Data.data.coord;
          console.log(lat_long_Obj,' lat_long_Obj ')
        dispatch({type:GET_CURRENT_CITY ,payload:lat_long_Obj})
       })
       .catch((er)=>{
         dispatch({type:GET_CURRENT_CITY_ERROR})
      })
}

// GET_CURRENT_CITY_LOADING = "gt/city/loading";
// GET_CURRENT_CITY ="get/current/city";
// GET_CURRENT_ERROR ="get/current/error";
