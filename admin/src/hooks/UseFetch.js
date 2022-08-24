import {useEffect, useState} from 'react'
import axios from "axios";

// this is a custom hook made by me for fecth data from backend, we pass the url to this function 
const UseFetch = (url)=>{
    const [data,setData] = useState()
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)

    useEffect(()=>{
        const fetchData = async () =>{
            setLoading(true);
            try{
                const res = await axios.get(url);
                console.log("data from api :",res.data)
                setData(res.data)


            }catch(err){
                setError(err)
            }
            setLoading(false)
        }

        fetchData();

    },[url])

    //this is same as fetchData function, but it is used when we have to fecth data not the time at reload
    const reFetch = async () =>{
        setLoading(true);
        try{
            const res = await axios.get(url);
            console.log("data from api :",res)
            setData(res.data)

        }catch(err){
            setError(err)
        }
        setLoading(false)
    }

    return {data,loading,error,reFetch}  // we retrun this for using other componnent

}

export default UseFetch;