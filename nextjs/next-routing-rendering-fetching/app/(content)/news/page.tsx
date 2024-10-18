// import { DUMMY_NEWS } from '@/dummy-news';
import NewsList from "@/components/news-list";
import { getAllNews } from "@/lib/news";
import { useEffect, useState } from "react";

export default async function NewsPage(){
    //Not using useeffect for Next 
    // const response = await fetch("http://localhost:8080/news");
    // if(!response.ok){
    //     throw new Error('Failed to fetch news.');
    // }

    // const news = await response.json();

    const news = await getAllNews();

    return (
    <main>
        <h1>The News</h1>
        <NewsList news={news} />
    </main>
    );
}