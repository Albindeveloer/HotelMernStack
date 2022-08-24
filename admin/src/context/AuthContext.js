import { createContext, useEffect, useReducer } from "react";

// // Put the object into storage
// localStorage.setItem('testObject', JSON.stringify(testObject));

// // Retrieve the object from storage
// var retrievedObject = localStorage.getItem('testObject');

// console.log('retrievedObject: ', JSON.parse(retrievedObject));

const INITIAL_STATE={
    user: JSON.parse(localStorage.getItem("user")) || null,       // user just null aki vekan pattila, karanam localstorgeil indenkil athan edukande, that means after login user sttored into localstorge ,then after  refresh the site that user cannot be null
    loading:false,
    error:null
};

export const AuthContext=createContext(INITIAL_STATE);

const AuthReducer = (state,action) => {
    switch(action.type){
        case "LOGIN_START":
            return{
                user:null,
                loading:true,
                error:null
            };
        case "LOGIN_SUCCESS":
            return{
                user:action.payload,
                loading:false,
                error:null
            };
        case "LOGIN_FAILURE":
            return{
                user:null,
                loading:false,
                error:action.payload
            }
        case "LOGOUT":
            return{
                user:null,
                loading:false,
                error:null
            };
        default:
            return state;
    }

}

export const AuthReducerProvider = ({children}) =>{
    const [state,dispatch]=useReducer(AuthReducer,INITIAL_STATE);

    //store user to local storage when login,state.user change avum dispatch method villikumbole appo useeffect work avum 
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state.user));  //json object ayitt localstorageill store cheyan pattila (state.user), so stringfy cheythu

    },[state.user])

    return(
        <AuthContext.Provider value={{
        user:state.user,
        loading:state.loading,
        error:state.error,
        dispatch

        }}>
        {children}
    </AuthContext.Provider>
    
    )
}