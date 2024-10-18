import SessionItem from "./SessionItem";

type SessionItemListProps = {
sessions: {
    id: string;
    title: string;
    summary: string;
    description: string;
    duration: number;
    date: string;
    image: string;
}[]
};

export default function SessionItemList({sessions}: SessionItemListProps){
    return (
        <ul id="sessions-list">
        {sessions.map((session) => (
                <li key={session.id}>
                <SessionItem {...session}></SessionItem>
                </li>
            ))}
        </ul>
      );
}