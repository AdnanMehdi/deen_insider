'use client'

import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

function Search({Menu}) {
    const [search,setSearch] = useState("")
    const router = useRouter()

    // router.query.search = search
    // router.query.category = Menu


    // const handleSubmit = () =>{
    //     e.preventDefault()
    // }


    useEffect(()=>{
        // window.history.pushState(
        //     null,
        //     "",
        //     `?search=${search}&category=${Menu}`
        // )
        const timer = setTimeout(() => {
            router.replace({ 
                pathname: '/', 
                query: { ...router.query,category:Menu ,search: search } }, 
                undefined, 
                {}
              )
          }, 500);
          return () => clearTimeout(timer);
        
        // router.push(`/?search=${search}`,{scroll:false})
    },[search,Menu])


  return (
    <div class="flex relative w-full" onSubmit={()=>handleSubmit()}>
        <div class="absolute inset-y-0 end-0 flex items-center ps-3 pr-3 pointer-events-none">
        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        </div>
        <input type="search" defaultValue={search} onChange={(e)=>{setSearch(e.target.value)}} id="default-search" class="w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-red-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Tags..(namaz..etc)" required/>
    </div>
  )
}

export default Search