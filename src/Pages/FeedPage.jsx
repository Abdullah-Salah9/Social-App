import { Button } from '@heroui/react'
import React, { useEffect, useState } from 'react'
import PostCard from '../Components/PostCard'
import { getAllPostsApi } from '../Services/postService'
import LoadingScreen from '../Components/LoadingScreen'
import CreatePost from '../Components/CreatePost'
import { useQuery } from '@tanstack/react-query'

export default function FeedPage() {

  // const [posts, setPosts] = useState([])

  // async function getAllPosts() {
  //   const response = await getAllPostsApi();
  //   setPosts(response.posts);
  // }

  // useEffect(()=>{
  //   getAllPosts()
  // },[])

  const [page, setPage] = useState(1)

  const {data : posts , isLoading , isError , isFetching , error, refetch} = useQuery({
    queryKey: ['posts',page],
    queryFn: ()=> getAllPostsApi(page),
    select: (data)=> data?.data.posts  ,
    retry: 0,
    // retryDelay: 10000,
    // retryOnMount: false,
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // refetchOnReconnect: false,
    // gcTime: 5000, 
    // staleTime:10000,
    // refetchInterval: 3000,
    // enabled: false,
  });
  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  } ,[page])

  return <>
  {/* <div className="w-2xl mx-auto">                 
  <CreatePost callback={getAllPosts}/>
  {posts.length === 0? <LoadingScreen/> : posts.map((post)=> <PostCard key={post.id} post={post} commentLimit={1} callback={getAllPosts}/>)}
  </div> */}

  {/* <Button onPress={refetch}>retry</Button> */}
  
    <div className="w-2xl mx-auto">
    <CreatePost callback={refetch}/>
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
