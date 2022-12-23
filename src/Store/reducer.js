import { AUTH_LOADING, AUTH_SUCESS, GET_DATA_ERROR, GET_DATA_LOCADING, GET_DATA_SUCEEFUL, GET_STATE, LOG_OUT, LOG_OUT_LOADING , } from "./action.types"




const initState ={
    dataLoading:false,
    dataError:false,
    dataSucess:false,
     data:[],
     vehicalList:[],
    token:'',
    authLoading:false,
    authSucess:false,
    authError:false,
    log_out:false,
    log_out_Loading:false,
}

export const reducer =(state=initState , {type , payload})=>{
    switch(type){
      
        case GET_DATA_LOCADING :{
            return {
                ...state,
                dataLoading:true,
                dataError:false,
                log_out:false
            }
        }
        case GET_DATA_SUCEEFUL :{
            const updateDAta = payload.map((elem)=> elem.vehicles )
            return {
                ...state,
                dataLoading:false,
                dataError:false,
                data :payload,
                log_out:false,
                vehicalList:updateDAta[0]
            }
        }
        case GET_DATA_ERROR :{
            return {
                ...state,
                dataLoading:false,
                dataError:true,
                log_out:false,
            }
        }
        case AUTH_LOADING :{
            return {
                ...state,
                authLoading:true,
                authSucess:false,
                authError:false,
                log_out:false

            }
        }
        case LOG_OUT_LOADING :{
            return {
                ...state,
                authLoading:false,
                authSucess:false,
                authError:false,
                logOut:false,
                log_out_Loading:true
                
            }
        }
        case AUTH_SUCESS :{
            localStorage.setItem("TOKEN" ,JSON.stringify(payload))
            console.log(payload)
            return {
                ...state,
                authLoading:false,
                authSucess:true,
                authError:false,
                token:payload,
                log_out:false
            }
        }
        case AUTH_LOADING :{
            return {
                ...state,
                authLoading:false,
                authSucess:false,
                authError:true,
               
            }
        }
        case LOG_OUT:{
            localStorage.removeItem("TOKEN")
            return {
                ...state,
                authLoading:false,
                authSucess:false,
                authError:false,
                logOut:true,
            }
        }

        default :{
            return state
        }
    }

}