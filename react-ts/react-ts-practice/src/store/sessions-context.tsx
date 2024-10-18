import { createContext, ReactNode, useContext, useReducer } from "react";

export type Session = {
    id: string;
    title: string;
    summary: string;
    description: string;
    date: string;
    image: string;
    duration: number;
  };

type SessionsState = {
    sessions: Session[];
};

type SessionsContextValue = SessionsState & {
    addSession: (sessionData: Session) => void,
    removeSession: (sessionId: string) => void
};

const initialState: SessionsState = {
    sessions: [] 
}

export const SessionsContext = createContext<SessionsContextValue | null>(null);

export function useSessionsContext(){
    const sessionsCtx = useContext(SessionsContext);

    if (sessionsCtx === null){
        throw new Error("SessionsContext is null - that should not be the case!");
    }
    return sessionsCtx;
}

type SessionsContextProviderProps = {
    children: ReactNode
};

type AddSessionAction = {
    type: 'ADD_SESSION';
    payload: Session;
}

type RemoveSessionAction = {
    type: 'REMOVE_SESSION';
    sessionId: string;
}

type Action = AddSessionAction | RemoveSessionAction;

function sessionsReducer(state: SessionsState, action: Action): SessionsState {
    if (action.type === 'ADD_SESSION'){
        //Always produce new state, don't edit directly
        //Check if it already exists
        if(state.sessions.some((session) => session.id === action.payload.id)){
            return state;
        }
        //Add it to the array
        return {sessions: state.sessions.concat(action.payload)}
    }
    if(action.type === 'REMOVE_SESSION'){
        //Always produce new state, don't edit directly
        //Remove the same ID
        return{sessions: state.sessions.filter((session) => session.id !== action.sessionId)}
    }
    return state;
}

export default function SessionsContextProvider({children}: SessionsContextProviderProps) {
    const [sessionsState, dispatch] = useReducer(sessionsReducer, initialState);

    const ctx: SessionsContextValue = {
        sessions: sessionsState.sessions,
        addSession(sessionData: Session) {
            dispatch({type: 'ADD_SESSION', payload: sessionData});
        },
        removeSession(sessionId: string) {
            dispatch({type: 'REMOVE_SESSION', sessionId});
        },
    };

    return <SessionsContext.Provider value={ctx}>{children}</SessionsContext.Provider> 
}