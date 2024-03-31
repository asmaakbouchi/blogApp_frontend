import React, { useEffect, useState } from 'react'
import { Card } from "flowbite-react";
import Axios from 'axios'

export default function () {

  const [posts,setPosts]=useState([]);
  useEffect((()=>{
    Axios.get("http://localhost:3000/posts")
    .then(res=>{
      setPosts(res.data)
    })
  }),[])

  return (
    <>
      <div className="text-2xl text-start mx-5 my-5">Posts</div>
      <div className='flex flex-wrap justify-around max-w-xl p-5' >
          {posts.map(post=>{
            return(
              <div className=' w-80 p-5' >
                <Card key={post._id}
                  >
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {post.titre}
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    {post.contenu}
                  </p>
                  <p className=" text-gray-700 dark:text-gray-400">
                    {post.date}
                  </p>
                </Card>
              </div>
            )
          })}
        </div>   
    </>

  )
}
