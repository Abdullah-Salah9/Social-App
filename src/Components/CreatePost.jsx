import { Button, Spinner } from '@heroui/react'
import React, { useEffect, useState } from 'react'
import staticImage from '../assets/icon-7797704_1280.png'
import { createPostApi, deletePostApi, updatePostApi } from '../Services/postService';

export default function CreatePost({callback , post , isUpdating , setIsUpdating}) {

    const [postBody, setPostBody] = useState(post?.body?? '');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(post?.image?? '');
    const [loading, setLoading] = useState(false);

    async function urlToFile() {
        const response = await fetch(post?.image);
        const data = await response.blob();

        let file = new File([data], 'image' , {type: 'image/jpg'});
        setImage(file)
    }

    useEffect(()=>{
        post && urlToFile()
    } , [])


    async function CreatePost(e) {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('body', postBody);
        formData.append('image', image);
        let response;
        if (isUpdating) {
            response = await updatePostApi(post.id , formData);
        }else{
            response = await createPostApi(formData);
        }

        if (response.message) {
            await callback(); 
            setPostBody('');
            setImageUrl('');
        }
        if (isUpdating) {
            setIsUpdating(false);
        }
        setLoading(false);
    }

    function handleImage(e){
        setImage(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
        e.target.value = ''
    }

  return <>
    <div className="bg-white relative rounded-md shadow-md py-3 px-3 my-5 overflow-hidden">
        <form onSubmit={CreatePost}>
            <textarea value={postBody} onChange={(e)=> setPostBody(e.target.value)} placeholder="Create Post, What's on Your Mind ....." className='border w-full resize-none rounded-md p-4' rows={4} name="" id=""></textarea>
           { imageUrl && <div className='relative'>
                <img src={imageUrl} className='w-full' alt="" />
                <svg onClick={()=> setImageUrl('')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute top-4 end-4 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>

            </div>}

           <div className="flex justify-between items-center">
             <label className='cursor-pointer hover:text-blue-500 flex gap-1 items-center'>
                <input onChange={handleImage} type="file" className='hidden'/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                <span>Image</span>
            </label>
            <div className='flex gap-2'>
                {isUpdating &&  <Button onClick={()=> setIsUpdating(false)} color='default'>Cancel</Button> }
                <Button type='submit' color='primary'>Post</Button>
            </div>
        </div>
        </form>
        {loading && <div className='absolute inset-0 bg-gray-300/50 flex justify-center items-center'>
            <Spinner/>
        </div>}
    </div>
  
  </>
}
