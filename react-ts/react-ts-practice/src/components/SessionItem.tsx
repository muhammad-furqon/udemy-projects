import {type PropsWithChildren} from "react";
import Button from "./Button";

type SessionItemProps = PropsWithChildren<{
    id:string,
    title:string,
    summary:string,
    // img: {src: string, alt: string}
    image:string
}>;

export default function SessionItem({id, title, summary, image}: SessionItemProps){
    return( 
        <article className="session-item">
            <img src={image} alt={title} />
            <div className="session-data">
                <div>
                    <h3>{title}</h3>
                    <p>{summary}</p>
                </div>
                <p className="actions">
                    <Button to={`./${id}`}>Click me</Button>
                </p>
            </div>
        </article>
    );
}

// const CourseGoal: FC<CourseGoalProps> = ({title, children}) => {
//     return <article>
//         <div>
//             <h2>{title}</h2>
//             <p>{children}</p>
//         </div>
//         <button>Delete</button>
//     </article>
// };
// export default CourseGoal;