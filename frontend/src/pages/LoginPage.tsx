import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { AxiosError } from "axios";
import { Button, TextField } from "@mui/material";
import type { RootState } from "../store";
import { userActions } from "../store/userSlice";
import useLogin from "../hooks/users/useLogin";
import type { Credentials } from "../utilities/types";
import logo from "/logo.png";
import { paragraph, title } from "../utilities/fonts";

const LoginPage = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, error } = useLogin();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const credentials: Credentials = { accountNumber, password };
    const res = await login(credentials);
    if (res) {
      window.localStorage.setItem("user", JSON.stringify(res));
      dispatch(userActions.setUser(res));
      navigate("/");
    }
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-offwhite'>
      <div className='w-2/5 shadow-xl rounded-xl border border-gray-200 flex flex-col items-center gap-5 bg-offwhite p-10'>
        <div className='w-70 '>
          <img src={logo} />
        </div>

        <div className='flex gap-5 py-10 px-5'>
          <div className='text-left'>
            <p style={{ fontFamily: title }} className='text-2xl'>
              BFP-NCR
            </p>
            <p style={{ fontFamily: paragraph }} className='text-2xl'>
              Recruitment System 2025
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className='w-1/2 flex flex-col justify-center gap-3'
          >
            <TextField
              variant='outlined'
              autoComplete='yes'
              size='small'
              type='text'
              label='Account number'
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
            <TextField
              variant='outlined'
              autoComplete='yes'
              size='small'
              type='password'
              label='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error instanceof AxiosError && error.response ? (
              <p className='text-center capitalize text-red-500'>
                {error.response.data?.error || "An error occurred"}
              </p>
            ) : (
              error && (
                <p className='text-center capitalize text-red-500'>
                  Something went wrong
                </p>
              )
            )}
            <Button
              variant='contained'
              color='customorange'
              type='submit'
              loading={isPending}
              loadingPosition='start'
            >
              Login
            </Button>
          </form>
        </div>
        <p className='border-t text-center'>
          Information Technology and Communication Unit, BFP-NCR CY2025
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
