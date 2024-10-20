import { useLocation, useNavigate } from "react-router-dom";

import Button from "./Button";
// import { TbRadiusBottomLeft } from "react-icons/tb";
// import { FaUserLarge } from "react-icons/fa6";
// import { RxAvatar } from "react-icons/rx";
import { IoHomeOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { GoPlusCircle } from "react-icons/go";
import { ImProfile } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = ({
  onClick,
  showAddTask,
  setShowAddTask,
  authState,
  setAuthState,
  layout,
  setLayout,
  setShowProfile,
  showProfile
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    console.log("Logging Out: ", authState);
    setAuthState(null);
    localStorage.setItem("login", JSON.stringify(null));
    navigate("/");
  };

  const handleShowProfile = () => {
    setShowProfile(!showProfile);
  }

  return (
    <header className="main-header">
      <div className="home-button">
        {(showAddTask || showProfile) && (
        <IoHomeOutline className="home-icon" onClick={() => {
          setShowProfile(false);
          setShowAddTask(false);
        }}/>)}
      </div>
      <h3>{ showProfile ? "User Profile" : "Task Tracker" }</h3>
      {/* {location.pathname === '/' && <Button onClick={onClick} text={showAddTask ? 'Close' : 'Add'} />} */}
      {location.pathname === "/task" && (
        !showAddTask && (
          <div className="header-right">
            <div className="dropdown">
              <GiHamburgerMenu className="profile-icon dropdown-toggle disabled" type="button" data-bs-toggle="dropdown" aria-expanded="false" />
              <ul className="dropdown-menu">
                {/* {!showAddTask && (
                  <> */}
                    <Button onClick={onClick} text={showAddTask ? "Close" : "Add Task"} >
                      <GoPlusCircle className="dropdown-icon" />
                    </Button>
                    <li><hr className="dropdown-divider"/></li>
                    <Button onClick={handleShowProfile} text={"Profile"} >
                      <ImProfile className="dropdown-icon"/>
                    </Button>
                    <li><hr className="dropdown-divider"/></li>
                  {/* </>
                )} */}
                    <Button onClick={logout} text={"Logout"} >
                      <BiLogOut className="dropdown-icon" />
                    </Button>
                {/* <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li> */}
              </ul>
            </div>
            {/* {!showAddTask && (
              <Button onClick={onClick} text={showAddTask ? "Close" : "Add"} />
            )}
            {!showAddTask && <Button onClick={logout} text={"Logout"} />} */}
          </div>
        )
      )}
    </header>
  );
};

export default Header;
