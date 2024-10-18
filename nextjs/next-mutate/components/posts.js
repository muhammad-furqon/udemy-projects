"use client"

import { formatDate } from '@/lib/format';
import LikeButton from './like-icon';
import { togglePostLikeStatus } from '@/actions/posts';
import { useEffect, useOptimistic } from 'react';
import Image from 'next/image';
import { GetObjectCommand, S3, S3Client } from '@aws-sdk/client-s3';

async function imageLoader(config){
  const urlStart = config.src.split('.com/')[0]
  const urlEnd = config.src.split('.com/')[1]
  // console.log(urlStart,urlEnd)

  // console.log (config);
  // Get the original image
  // console.log (config);
  return config.src;
}

function Post({ post , action}) {
  // const urlStart = post.image.split('.com/')[0]
  const urlEnd = post.image.split('.com/')[1]
  const client = new S3Client({});

  const command = new GetObjectCommand({
    Bucket: 'next-image-furqon',
    Key: urlEnd,
  });

  // useEffect(async function test(){
  //   const response = await client.send(command);
  //   const imageData = await response.Body.transformToByteArray();
  //   console.log(imageData);
  // },[]);
  
  // console.log(response);

  return (
    <article className="post">
      <div className="post-image">
        <Image src={post.image} fill sizes="w200" alt={post.title} quality={50}/>
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{' '}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form action={action.bind(null, post.id)} className={post.isLiked ? 'liked' : ''}>
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(posts, (prevPosts, updatedPostId) => {
    const updatedPostIndex = prevPosts.findIndex(post => post.id === updatedPostId);

    if (updatedPostIndex === -1){
      return prevPosts;
    }

    //Change the like number
    const updatedPost = {...prevPosts[updatedPostIndex]};
    updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1);
    updatedPost.isLiked = !updatedPost.isLiked;
    const newPosts = [...prevPosts]
    newPosts[updatedPostIndex] = updatedPost;
    return newPosts;
  })

  if (!posts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  async function updatePost(postId){
    updateOptimisticPosts(postId);
    await togglePostLikeStatus(postId);
  }

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePost}/>
        </li>
      ))}
    </ul>
  );
}
