import { FormEvent, useEffect, useRef } from "react";
import { Session, useSessionsContext } from "../store/sessions-context"
import Modal, { ModalHandle } from "./Modal";
import Input from "./Input";
import Button from "./Button";

type BookSessionProps = {
    session: Session;
    onDone: () => void;
}

export default function BookSession({session, onDone}:BookSessionProps){
    //Get modal reference
    const modal = useRef<ModalHandle>(null);
    //Get session context
    const sessionCtx = useSessionsContext();

    //Use Effect to open Modal via exposed
    useEffect(() => {
        if(modal.current){
            modal.current.open();
        }
    },[]);

    //Handle on submit
    function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData); //data dummy, not send to anywhere
        sessionCtx.addSession(session);
        onDone();

        //Debug
        console.log("Add session");
        // console.log(sessionCtx.sessions);
    }

    return (
        <Modal ref={modal} onClose={onDone}>
          <h2>Book Session</h2>
          <form onSubmit={handleSubmit}>
            <Input label="Your name" id="name" name="name" type="text" />
            <Input label="Your email" id="email" name="email" type="email" />
            <p className="actions">
              <Button type="button" textonly onClick={onDone}>
                Cancel
              </Button>
              <Button>Book Session</Button>
            </p>
          </form>
        </Modal>
      );
}