import { ReactNode, useEffect, useState } from "react";
import { get } from "./util/http";
import BlogPosts, { BlogPost } from "./components/BlogPosts";
import fetchingImg from './assets/data-fetching.png'
import { z } from "zod";
import ErrorMessage from "./components/ErrorMessage";

type RawDataBlogPost = {
  id:number;
  userId: number;
  title: string;
  body: string;
}

const rawDataBlogPostSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  body: z.string(),
});

// const expectedResponseDataSchema = z.array(rawDataBlogPostSchema);

function App() {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    // async function fetchPosts(){
    //   const data = (await get('https://jsonplaceholder.typicode.com/posts')) as RawDataBlogPost[];
    //   const blogPosts:BlogPost[] = data.map(rawPost => {
    //     return{
    //       id: rawPost.id,
    //       title: rawPost.title,
    //       text: rawPost.body
    //     }
    //   });
    //   setFetchedPosts(blogPosts)
    // }
    async function fetchPosts(){
      setIsFetching(true);
      try {
        const data = await get('https://jsonplaceholder.typicode.com/posts', z.array(rawDataBlogPostSchema));
        // const parsedData = expectedResponseDataSchema.parse(data);
        const blogPosts:BlogPost[] = data.map(rawPost => {
          return{
            id: rawPost.id,
            title: rawPost.title,
            text: rawPost.body
          }
        });
        setFetchedPosts(blogPosts)        
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }

      setIsFetching(false);
    }

    fetchPosts();
  },[]);
  
  let content: ReactNode;

  if (error){
    content = <ErrorMessage text={error} />
  }

  if (fetchedPosts){
    content = <BlogPosts posts={fetchedPosts} />
  }

  if (isFetching){
    content = <p id="loading-fallback">Fetching posts...</p>
  }

  return (
    <main>
      <img src={fetchingImg} alt="An abstract image for fetching the data" />
      {content}
    </main>
  );
}

export default App;
