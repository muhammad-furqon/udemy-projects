import { Session, useSessionsContext } from "../store/sessions-context"
import Button from "./Button";

type UpcomingSessionProp = {
    session: Session
    onCancel: () => void;
}

export default function UpcomingSession({session, onCancel}:UpcomingSessionProp){
    const {title, summary, date} = session;
    //const sessionCtx = useSessionsContext();

    return(
        <article className="upcoming-session">
            <div>
            <h3>{title}</h3>
            <p>{summary}</p>
            <time dateTime={new Date(date).toISOString()}>
              {new Date(date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </time>
            </div>
            <p className="action">
                <Button type="button" textonly onClick={onCancel}>
                    Cancel
                </Button>
            </p>
        </article>
    );
}