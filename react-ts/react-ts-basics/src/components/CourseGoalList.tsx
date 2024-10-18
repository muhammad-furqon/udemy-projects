import CourseGoal from "./CourseGoal";
import { type CourseGoal as CGoal } from "../App";
import InfoBox from "./InfoBox";
import { ReactNode } from "react";


type CourseGoalListProps = {
    goals:CGoal[];
    onDeleteGoal: (id:number) => void;
};

export default function CourseGoalList({goals, onDeleteGoal}:CourseGoalListProps){
    if (goals.length === 0){
      return <InfoBox mode="hint">
        You have no course goals yet. Start adding some!
      </InfoBox>
    }

    let warningbox: ReactNode;

    if (goals.length >= 4){
      warningbox = (
        <InfoBox mode="warning" severity="medium">
          You're collecting a lot of goals. Don't put too much on your plate!
        </InfoBox>
      );
    }

    return(
      <>
        {warningbox}
        <ul>
          {goals.map((goal) => (
            <li key={goal.id}>
              <CourseGoal id={goal.id} title={goal.title} onDelete={onDeleteGoal} >
                <p>{goal.description}</p>
              </CourseGoal>
            </li>
          ))}
        </ul>
      </>
    );
}