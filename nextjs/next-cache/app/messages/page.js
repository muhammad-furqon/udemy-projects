import Messages from '@/components/messages';
import { getMessages } from '@/lib/messages';
import { unstable_noStore } from 'next/cache';

//name must be revalidate
// export const revalidate = 5;
// export const dynamic = 'force-dynamic'; //Equal to no-store (deprecated)
// export const fetchCache = 'force-no-store'

export default async function MessagesPage() {
  // unstable_noStore();
  // const response = await fetch('http://localhost:8080/messages',{
  //   next: {tags: ['msg']},
  // });
  // const messages = await response.json();

  const messages = await getMessages();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}




// //Request with the same configuration 
// const response = await fetch('http://localhost:8080/messages', {
//   //Default force-store or no-store
//   // cache: 'no-store'
  
//   next: {
//     //Re-use for 5 seconds
//     revalidate: 5
//   }
// });