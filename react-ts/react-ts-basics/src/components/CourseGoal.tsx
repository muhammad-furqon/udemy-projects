import {type FC, type PropsWithChildren, type ReactNode } from "react";

// type CourseGoalProps = {
//     title: string;
//     children: ReactNode
// }

type CourseGoalProps = PropsWithChildren<{
    id:number,
    title: string, 
    onDelete: (id:number) => void;
}>;

export default function CourseGoal({title, id, onDelete, children}: CourseGoalProps){
    return( 
        <article>
            <div>
                <h2>{title}</h2>
                <p>{children}</p>
            </div>
            <button onClick={() => onDelete(id)}>Delete</button>
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