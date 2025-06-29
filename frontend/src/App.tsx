import { Route, Routes, Navigate } from "react-router";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { userActions } from "./store/userSlice";
import type { RootState } from "./store";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const loggedUserJSON = window.localStorage.getItem("user");
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        dispatch(userActions.setUser(user));
      }
    } catch (error) {
      console.error("Error parsing loggedUser data:", error);
    }

    setIsLoading(false);
  }, [dispatch]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route
        path='/*'
        element={user ? <HomePage /> : <Navigate to='/login' />}
      />
    </Routes>
  );
}

export default App;
