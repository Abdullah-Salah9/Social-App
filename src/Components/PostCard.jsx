import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from '@heroui/react'
import PostBody from './Card/PostBody'
import PostFooter from './Card/PostFooter'
import PostHeader from './Card/PostHeader'
import Comment from './Comment'
import { useContext, useState } from 'react'
import { createCommentApi, getPostCommentsApi } from '../Services/commentService'
import { AuthContext } from '../Context/AuthContext'
import DropDownAction from './DropDownAction'
import CreatePost from "../Components/CreatePost";
import { deletePostApi } from '../Services/postService'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../main'

export default function PostCard({post , commentLimit , callback}) {

  const [commentContent, setCommentContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false)
  const [comments, setComments] = useState([...post.comments].reverse());

  const {userData} =  useContext(AuthContext)

  // async function createComment(e){
  //   e.preventDefault();
  //   setLoading(true);
  //   setInput(true)
  //   const resposne = await createCommentApi(commentContent, post.id);

  //   if (resposne.message) {
  //     setComments(resposne.comments);
  //     setCommentContent('');
  //     // await callback()
  //   }
  //   setInput(false)
  //   setLoading(false);
  // }

  const { mutate: createComment, isPending} = useMutation({
    mutationKey:['create-comment'],
    mutationFn: ()=> createCommentApi(commentContent, post.id),
    onSuccess: async (data)=> {
      setCommentContent('');
      await queryClient.invalidateQueries(['posts'])
      setComments(data.data.comments);
    },
    onError: (err)=>{
      console.log(err)
    }
  })


  async function getPostComments() {
    const response = await getPostCommentsApi(post.id);
    setComments(response.comments)
  }

  async function deletePost(postId) {
    const response = await deletePostApi(postId);
    if (response.message) {
      await callback()
    }

  }

  return <>
    {isUpdating ? 
    <CreatePost post={post} callback={callback} isUpdating={isUpdating} setIsUpdating={setIsUpdating}/> 
    : 
    <div className="bg-white w-full rounded-md shadow-md h-auto py-3 px-3 my-5 overflow-hidden">
    <div className="w-full h-16 items-center flex justify-between ">
      <PostHeader name={  post.user.name} photo={post.user.photo} date={post.createdAt}/>
      {userData._id === post.user._id && 
      <Dropdown>
        <DropdownTrigger>
          <svg className="w-16 outline-0 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round"><circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} /></svg>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem onClick={()=> setIsUpdating(true)} key="edit">Edit </DropdownItem>
          <DropdownItem onClick={()=> deletePost(post.id)} key="delete" className="text-danger" color="danger">
            Delete 
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
        
      } 
    </div>
    <PostBody body={post.body} image={post.image}/>
    <PostFooter postId={post.id} commentsNumber={comments.length}/>
    <div className='flex gap-2 mb-2'>
      
        <Input disabled={input} value={commentContent} onChange={(e)=> setCommentContent(e.target.value)} variant='bordered' placeholder='Comment...'/>
        <Button onPress={createComment} isLoading={isPending} type='submit' disabled={commentContent.length<2} color='primary'>Add Comment</Button>
      
    </div>
    {comments.length > 0 && comments.slice(0, commentLimit).map((comment)=> <Comment callback={getPostComments} postUserId={post.user._id} comment={comment} key={comment._id}/>) }
  </div>
    }
  </>
}
