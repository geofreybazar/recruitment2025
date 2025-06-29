import { Suspense, lazy } from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";

import type { RootState } from "../store";
import ErrorFallback from "../components/ReusableComponents/ErrorFallback";
import Sidebar from "../components/Sidebar";
import HomePageRoutes from "../components/Routes/HomePageRoutes";

const Navbar = lazy(() => import("../components/Navbar/Navbar"));

const HomePage = () => {
  const user = useSelector((state: RootState) => state.user.user);

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  return (
    <div className='flex w-screen h-screen'>
      <div className='w-1/6 bg-offwhite overflow-auto'>
        <Sidebar />
      </div>
      <div className='flex-1 flex flex-col'>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense
            fallback={
              <div className='bg-offwhite text-offwhite p-4 flex justify-end'>
                <div className='bg-gray-500 w-96 h-6 rounded-full animate-pulse' />
              </div>
            }
          >
            <Navbar />
          </Suspense>
        </ErrorBoundary>
        <div className='flex-1 p-4 overflow-auto'>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <HomePageRoutes />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
