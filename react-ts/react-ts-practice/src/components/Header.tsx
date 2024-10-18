import { NavLink, useLocation, useParams } from "react-router-dom";
import Button from "./Button";
import { useState } from "react";
import UpcomingSessions from "./UpcomingSessions";

export default function Header() {
    const location = useLocation();
    const [isViewUpcoming, setIsViewUpcoming] = useState(false);

    function handleViewUpcoming(){
      setIsViewUpcoming(true);
    }
  
    function handleStopViewUpcoming(){
      setIsViewUpcoming(false);
    }

    // const params = useParams<{ id: string }>();
    return (
      <>
        {isViewUpcoming && <UpcomingSessions onDone={handleStopViewUpcoming}></UpcomingSessions>}
        <header id="main-header">
          <h1>ReactMentoring</h1>
          <nav>
                <ul>
                    <li>
                      <NavLink to="/" className={({isActive}) => isActive ? 'active' : ''} end>Our Mission</NavLink>
                    </li>
                    <li>
                      <NavLink to="/sessions" className={({isActive}) => isActive ? 'active' : ''}>Browse Sessions</NavLink>
                    </li>
                    <li>
                        {/* Todo: Manage booked sessions */}
                        <Button onClick={handleViewUpcoming}>Upcoming Sessions</Button>
                    </li>
                </ul>
            </nav>
        </header>
      </>
    );
  }