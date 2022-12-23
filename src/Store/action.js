import { AUTH_ERROR, AUTH_LOADING, AUTH_SUCESS, GET_DATA_ERROR, GET_DATA_LOCADING, GET_DATA_SUCEEFUL, GET_STATE, LOG_OUT, LOG_OUT_LOADING } from "./action.types"
import axios from 'axios';



export const getDATA_Fun =(token)=> (dispatch)=> {
             dispatch({type:GET_DATA_LOCADING})
                console.log(token)
                axios.get('https://staging-api.tracknerd.io/v1/vehicle-groups/vehicles', {
            headers: {
                'Authorization': `Bearer ${token}` }
            }) .then(( data ) => {
            console.log(data.data.data ,'data dtat is')
            dispatch({type:GET_DATA_SUCEEFUL , payload:data.data.data})
          })
          .catch((error) => {
            dispatch({type:GET_DATA_ERROR})
          });
      }
export const getAuth_Fun =  (payload)=>  (dispatch)=>{
    // console.log(payload)
    dispatch({type:AUTH_LOADING})
    axios.post("https://staging-api.tracknerd.io/v1/auth/login",payload )
    .then((res) => {
        console.log(res.data)
        let token = res.data.token
      dispatch({type:AUTH_SUCESS , payload:token})
    })
    .catch(() => {
      dispatch({type:AUTH_ERROR});
    });
}


export const log_out_Fun =(dispatch)=>{
 dispatch({type:LOG_OUT_LOADING})
 setTimeout(()=>{
  dispatch({type:LOG_OUT})
 },[500])

}
