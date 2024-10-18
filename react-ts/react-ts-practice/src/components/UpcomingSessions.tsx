import { useEffect, useRef } from "react";
import Modal, { ModalHandle } from "./Modal";
import { useSessionsContext } from "../store/sessions-context";
import Button from "./Button";
import UpcomingSession from "./UpcomingSession";

type UpcomingSessionProp = {
    onDone: () => void;
}

export default function UpcomingSessions({onDone}:UpcomingSessionProp){
    //Get modal reference
    const modal = useRef<ModalHandle>(null);
    //Get session context
    const sessionCtx = useSessionsContext();

    useEffect(() => {
        if (modal.current) {
            modal.current.open();
        }
    }, [])

    //Handle on delete
    function handleCancelSession(sessionId: string){
        sessionCtx.removeSession(sessionId);

        //Debug
        console.log("Remove session");
        // console.log(sessionCtx.sessions);
    }

    return(
        <>
            <Modal ref={modal} onClose={onDone}>
                <h2>Upcoming Sessions</h2>
                <ul>
                {sessionCtx.sessions.map((session)=>(
                    <li key={session.id}>
                        <UpcomingSession session={session} onCancel={() => handleCancelSession(session.id)}/>
                    </li>
                ))}
                </ul>
                
                <Button type="button" onClick={onDone}>
                    Close
                </Button>
            </Modal>
        </>
    );
}