import React, { useState } from 'react'
import {  useEffect } from 'react';



function useApi(url) {

    let[data,setdata]=useState(null);
    let [loading, setloading]=useState(false);

        useEffect(()=>{
        setloading(true)
        fetch(url).then((res)=>{
             console.log(res);
             
            res.json().then((json)=>{
                console.log(json);
                
                setdata(json);
                setloading(false)
            })
        })
    },[url])
    

  return [data];
}

export default useApi
