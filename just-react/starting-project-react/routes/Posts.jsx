import { useState } from 'react';

import Post from "../src/components/Post";
import PostsList from "../src/components/PostsList"
import MainHeader from "../src/components/MainHeader";
import { Outlet } from 'react-router-dom';

function Posts() {
  return (
  <>
    <Outlet />
    <main>
      <PostsList />
    </main>
  </>
  );
}

export default Posts;

export async function loader(){
  const response = await fetch('http://localhost:8080/posts')
  const resData = await response.json();
  return resData.posts;
}