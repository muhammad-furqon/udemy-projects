import Button from '../components/Button.tsx';
import SessionItemList from '../components/SessionItemList.tsx';
import { SESSIONS } from '../dummy-sessions.ts'; // normally, we would probably load that from a server

export default function SessionsPage() {
  return (
    <main id="sessions-page">
      <header>
        <h2>Available mentoring sessions</h2>
        <p>
          From an one-on-one introduction to React's basics all the way up to a
          deep dive into state mechanics - we got just the right session for
          you!
        </p>
      </header>
      <SessionItemList sessions={SESSIONS} />
      
      {/* <ul>
        <li>
            <Button textonly={true} >Click me</Button>
        </li>
        <li>
            <Button textonly={true} to="/">Click me</Button>
        </li>
      </ul> */}
    </main>
  );
}
