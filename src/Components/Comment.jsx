import React, { useContext, useState } from 'react'
import PostHeader from './Card/PostHeader'
import { AuthContext } from '../Context/AuthContext'
import DropDownAction from './DropDownAction'
import { useMutation } from '@tanstack/react-query';
import { updateCommentApi } from '../Services/commentService';
import { Button, Input } from '@heroui/react';

export default function Comment({comment , postUserId, callback}) {
  let {userData} = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [commentContent, setCommentContent] = useState(comment.content);

  const { mutate: updateComment, isPending} = useMutation({
    mutationKey: ['update-comment',comment._id],
    mutationFn: async()=> await updateCommentApi(comment._id, commentContent),
    onSuccess: ()=> {
      setIsEditing(false);
      callback();
    },
    onError: (err)=>{
      console.log(err);
    }
  })

  return <>
  
  <div className="p-4 bg-gray-100 -mx-3 -mb-3">
    <div className="w-full items-center flex justify-between ">
        <PostHeader photo={comment.commentCreator.photo} name={comment.commentCreator.name} date={comment.createdAt}/>
        {userData._id === comment.commentCreator._id && <DropDownAction onEdit={()=>setIsEditing(true)} callback={callback} commentId={comment._id}/>
        }
    </div>
    {isEditing ?
    <div className='p-4 pb-0 flex gap-2'>
      <Input variant='bordered' value={commentContent} onChange={(e)=> setCommentContent(e.target.value)} />
      <Button onClick={()=> {
        setCommentContent(comment.content);
        setIsEditing(false);
        }} color='default'>Cancel</Button>
      <Button onClick={updateComment} color='primary' disabled={isPending} isLoading={isPending}>Save</Button>
    </div>
    : <p className='p-4 pb-0'>{comment.content}</p>}
    </div>
  
  </>
}
