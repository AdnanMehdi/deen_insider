import React from 'react'
import ReactPlayer from 'react-player'

export default function GoogleBar({model,setModel,post}) {

    console.log(post)
   
  return (
    <div className={`w-1/2 h-12 z-20 p-5 rounded-2xl bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,1)] 
    fixed right-0 md:h-3/4 overflow-auto ${model ? "visible" : "collapse"}`}>
        <div>
            <h1>{post?.title}</h1>
        </div>
        <div className="absolute right-0 top-0 p-5">
            <img onClick={()=>setModel(false)} src='/images/close.png' width="30px" height="30px" className='cursor-pointer' alt='not found'/>
        </div>
        <div>
           {post?.link ? <ReactPlayer url={post.link} controls/>
           : <img src={post?.banner ? post.banner: post?.mediaUrl} className='rounded-2xl' alt='not found'/>}
        </div>
        <div className='text-wrap pt-3'>
            <p>{post?.content}</p>
        </div>
    </div>
  )
}

const myStyles={
    playerWrapper:{
        borderRadius:"20px"
    }
}