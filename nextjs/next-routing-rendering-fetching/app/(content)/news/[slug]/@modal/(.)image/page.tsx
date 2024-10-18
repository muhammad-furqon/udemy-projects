import { DUMMY_NEWS } from '@/dummy-news';
import { getNewsItem } from '@/lib/news';
import { notFound } from 'next/navigation';
import ModalBackdrop from '@/components/modal-backdrop';

export default async function InterceptedImagePage({params}){
    
    const newsItemSlug = params.slug;
    const newsItem = await getNewsItem(newsItemSlug);
    
    if(!newsItem){
        notFound();
    }

    return( 
    <>
        <ModalBackdrop />
        <dialog className='modal' open>
            <div className="fullscreen-image"> 
                <img src={`/images/news/${newsItem.image}`} alt={newsItem.title}/>
            </div>
        </dialog>
    </>
    );
}