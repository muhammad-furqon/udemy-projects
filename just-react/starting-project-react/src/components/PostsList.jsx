import { useState, useEffect } from 'react';

import Post from "./Post";
import classes from "./PostsList.module.css";
import { useLoaderData } from 'react-router-dom';

function PostsList(){
    const posts = useLoaderData();

    // useEffect(() => {
    //     async function fetchPosts(){
    //         setIsFetching(true);
    //         const response = await fetch('http://localhost:8080/posts')
    //         const resData = await response.json();
    //         // if(!response.ok){}
    //         setPosts(resData.posts);
    //         setIsFetching(false);
    //     }

    //     fetchPosts();
    // }, []);

    return(
        <>
            {posts.length > 0 && (
            <ul className={classes.posts}>
                {posts.map((post) => <Post key={post.id} id={post.id} author={post.author} body={post.body}/>)}
            </ul>
            )}
            {posts.length === 0 && (
                <div style={{textAlign: 'center', color: 'white'}}>
                    <h2>There are no posts yet.</h2>
                    <p>Start adding some post!</p>
                </div>
            )}
        </> 
    );
}

export default PostsList;