import axios from "axios"



export  function getAllPostsApi(page = 1) {
    
        return axios.get('https://linked-posts.routemisr.com/posts', {
            headers: {
                token: localStorage.getItem('token')
            }, 
            params: {
                limit:15,
                page,
                sort: '-createdAt'
            }
        }) 
    
}

// export async function getAllPostsApi() {
//     try {
//         const {data} = await axios.get('https://linked-posts.routemisr.com/posts', {
//             headers: {
//                 token: localStorage.getItem('token')
//             }, 
//             params: {
//                 limit:15,
//                 sort: '-createdAt'
//             }
//         })
//         // console.log(data);
//         return data
//     } catch (err) {
//         console.log(err); 
//     }
// }


export async function getSinglePostApi(postId) {
    try {
        const {data} = await axios.get('https://linked-posts.routemisr.com/posts/'+postId, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        console.log(data);
        return data
    } catch (err) {
        console.log(err); 
    }
}


export async function createPostApi(formData) {
    try {
        const {data} = await axios.post('https://linked-posts.routemisr.com/posts', formData , {
        headers:{
            token: localStorage.getItem('token')
        }
    })
    // console.log(data)
    return data

    } catch (err) {
        console.log(err)
    }
}

export async function updatePostApi(postId ,formData) {
    try {
        const {data} = await axios.put('https://linked-posts.routemisr.com/posts/'+postId , formData , {
        headers:{
            token: localStorage.getItem('token')
        }
    })
    // console.log(data)
    return data

    } catch (err) {
        console.log(err)
    }
}

export async function deletePostApi(postId) {
    try {
        const {data} = await axios.delete('https://linked-posts.routemisr.com/posts/'+postId, {
        headers:{
            token: localStorage.getItem('token')
        }
    })
    // console.log(data)
    return data

    } catch (err) {
        console.log(err)
    }
}


export async function getProfilePostsApi(userId , page = 1) {
    return axios.get('https://linked-posts.routemisr.com/users/'+userId+'/posts', {
        headers: {
            token: localStorage.getItem('token')
        },
        params: {
            limit: 15,
            page,
            sort: '-createdAt'
        }
    })
}

