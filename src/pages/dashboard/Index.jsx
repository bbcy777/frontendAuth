import { useAuth } from "../../context/auth/auth_context";

const Dashboard = () => {
  const {logOut} = useAuth();

  const handleClick = () => {
    logOut()
  }
  return (
    <div>
      <h1>Only Users Should See This Page</h1>
      <button onClick={handleClick}>LogOut</button>
    </div>
  );
};

export default Dashboard;
