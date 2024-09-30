// import { useState, useEffect } from 'react'
import FetchData from '../FetchData'
// import './posts.css'

export default function Comments({postId, clickCloseUser , clickClosePost}){

    return(
        <>
            {!clickCloseUser && !clickClosePost && 
                <div className='containerPostsComments'>
                    <FetchData urlPoint={`comments/?postId=${postId}`}/>
                </div>
            }    
        </>
    )
}