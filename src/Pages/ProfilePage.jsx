import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { useQuery } from '@tanstack/react-query'
import { getProfilePostsApi } from '../Services/postService'
import LoadingScreen from '../Components/LoadingScreen'
import { Button } from '@heroui/react'
import PostCard from '../Components/PostCard'

export default function ProfilePage() {

  const [page, setPage] = useState(1);
  
  const {userData} = useContext(AuthContext);

  

  const {data: posts , isLoading ,refetch, isError, error} = useQuery({
    queryKey: ['profile',page],
    queryFn:()=> getProfilePostsApi(userData._id, page),
    select: (data)=> data?.data.posts
  });

useEffect(()=>{
  window.scrollTo({
    top:0,
    behavior:'smooth'
    })
}, [page]);


  return <>
    <div className="w-2xl mx-auto">
      
      {isLoading? <LoadingScreen/> : isError ? <div className='flex justify-center items-center h-screen'>
        <h2 className='text-4xl text-danger'>{error.message}</h2>
        <Button onPress={refetch}>retry</Button>
      </div> :
        posts?.map((post)=> <PostCard key={post.id} post={post} commentLimit={1} callback={refetch} />)}
      
      {isLoading ? '' : <div className='flex justify-between'>
        <Button color='primary' disabled={page === 1} onPress={()=>setPage(page-1)}>Prev</Button>
        <p>{page}</p>
        <Button color='primary' disabled={posts?.length < 15} onPress={()=>setPage(page+1)}>Next</Button>
      </div>}
    </div>
  
  </>
}
