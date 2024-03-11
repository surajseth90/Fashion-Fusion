import React, { useEffect, useState } from "react";
import "./style.scss";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setSnakeBarContent } from "../../action";

export default function SignInUp() {
  const [mode, setMode] = useState("signIn");
  const [signInData, setSignInDate] = useState({});
  const [signUpData, setSignUpDate] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordEye, setPasswordEye] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setPasswordEye(false);
  }, [mode]);

  const signUpDataChangeHandler = (e) => {
    const { name, value } = e.target;
    setSignUpDate((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        signUpData.email,
        signUpData.password
      );
      await updateProfile(res.user, {
        displayName: signUpData.name,
      });

      await setDoc(doc(db, "USER_DATA", res.user.uid), {
        displayName: signUpData.name,
        addresses: [],
        wishlist: [],
        cart: [],
        orders: [],
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(
        setSnakeBarContent(
          error.message.includes("Firebase:")
            ? error.message.split("Firebase:")[1]
            : error.message
        )
      );
      console.log("There is some error creating User : ", error);
    }
  };

  const signInDataChangeHandler = (e) => {
    const { name, value } = e.target;
    setSignInDate((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const signInHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(
        auth,
        signInData.email,
        signInData.password
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("There is some error logining User : ", error);
    }
  };

  return (
    <main>
      <div className="container py-5">
        <div className="form-wrapper d-flex align-items-center justify-content-center">
          {mode === "signIn" ? (
            <form
              onSubmit={signInHandler}
              className="d-flex flex-column form-container w-100"
            >
              <input
                className="my-2 py-2 px-3"
                type="email"
                name="email"
                placeholder="Email"
                onChange={signInDataChangeHandler}
                required
                disabled={loading}
              />
              <div className="position-relative w-100">
                <input
                  className="my-2 py-2 px-3 w-100"
                  type={passwordEye ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  onChange={signInDataChangeHandler}
                  required
                  disabled={loading}
                />

                <button
                  type="button"
                  title={passwordEye ? "hide" : "show"}
                  className="position-absolute"
                  style={{ right: 15, top: 15 }}
                  onClick={() => setPasswordEye(!passwordEye)}
                >
                  {passwordEye ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512.19 512.19"
                      width="24"
                      height="24"
                      fill="#6a6d6f"
                    >
                      <g>
                        <path d="M496.543,200.771c-19.259-31.537-43.552-59.707-71.915-83.392l59.733-59.733c8.185-8.475,7.95-21.98-0.525-30.165   c-8.267-7.985-21.374-7.985-29.641,0l-64.96,65.045c-40.269-23.918-86.306-36.385-133.141-36.053   c-132.075,0-207.339,90.411-240.448,144.299c-20.862,33.743-20.862,76.379,0,110.123c19.259,31.537,43.552,59.707,71.915,83.392   l-59.733,59.733c-8.475,8.185-8.71,21.691-0.525,30.165c8.185,8.475,21.691,8.71,30.165,0.525c0.178-0.172,0.353-0.347,0.525-0.525   l65.109-65.109c40.219,23.915,86.201,36.402,132.992,36.117c132.075,0,207.339-90.411,240.448-144.299   C517.405,277.151,517.405,234.515,496.543,200.771z M128.095,255.833c-0.121-70.575,56.992-127.885,127.567-128.006   c26.703-0.046,52.75,8.275,74.481,23.793l-30.976,30.976c-13.004-7.842-27.887-12.022-43.072-12.096   c-47.128,0-85.333,38.205-85.333,85.333c0.074,15.185,4.254,30.068,12.096,43.072l-30.976,30.976   C136.414,308.288,128.096,282.394,128.095,255.833z M256.095,383.833c-26.561-0.001-52.455-8.319-74.048-23.787l30.976-30.976   c13.004,7.842,27.887,12.022,43.072,12.096c47.128,0,85.333-38.205,85.333-85.333c-0.074-15.185-4.254-30.068-12.096-43.072   l30.976-30.976c41.013,57.434,27.702,137.242-29.732,178.255C308.845,375.558,282.798,383.879,256.095,383.833z" />
                      </g>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512.19 512.19"
                      width="24"
                      height="24"
                      fill="#6a6d6f"
                    >
                      <g>
                        <circle cx="256.095" cy="256.095" r="85.333" />
                        <path d="M496.543,201.034C463.455,147.146,388.191,56.735,256.095,56.735S48.735,147.146,15.647,201.034   c-20.862,33.743-20.862,76.379,0,110.123c33.088,53.888,108.352,144.299,240.448,144.299s207.36-90.411,240.448-144.299   C517.405,277.413,517.405,234.777,496.543,201.034z M256.095,384.095c-70.692,0-128-57.308-128-128s57.308-128,128-128   s128,57.308,128,128C384.024,326.758,326.758,384.024,256.095,384.095z" />
                      </g>
                    </svg>
                  )}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="d-flex justify-content-center btn-orange my-2 py-2"
              >
                {loading ? <div className="btn-loader-white"></div> : "Sign In"}
              </button>

              <p className="text-center font-14">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="switch-btn font-bold text-orange"
                  onClick={() => setMode("signUp")}
                  disabled={loading}
                >
                  Sign Up
                </button>
              </p>
            </form>
          ) : (
            <form
              className="d-flex flex-column form-container w-100"
              onSubmit={signUpHandler}
            >
              <input
                className="my-2 py-2 px-3"
                type="name"
                name="name"
                placeholder="Name"
                required
                onChange={signUpDataChangeHandler}
                disabled={loading}
              />
              <input
                className="my-2 py-2 px-3"
                type="email"
                name="email"
                placeholder="Email"
                required
                onChange={signUpDataChangeHandler}
                disabled={loading}
              />
              <div className="position-relative w-100">
                <input
                  className="my-2 py-2 px-3 w-100"
                  type={passwordEye ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  required
                  onChange={signUpDataChangeHandler}
                  disabled={loading}
                />
                <button
                  type="button"
                  title={passwordEye ? "hide" : "show"}
                  className="position-absolute"
                  style={{ right: 15, top: 15 }}
                  onClick={() => setPasswordEye(!passwordEye)}
                >
                  {passwordEye ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512.19 512.19"
                      width="24"
                      height="24"
                      fill="#6a6d6f"
                    >
                      <g>
                        <path d="M496.543,200.771c-19.259-31.537-43.552-59.707-71.915-83.392l59.733-59.733c8.185-8.475,7.95-21.98-0.525-30.165   c-8.267-7.985-21.374-7.985-29.641,0l-64.96,65.045c-40.269-23.918-86.306-36.385-133.141-36.053   c-132.075,0-207.339,90.411-240.448,144.299c-20.862,33.743-20.862,76.379,0,110.123c19.259,31.537,43.552,59.707,71.915,83.392   l-59.733,59.733c-8.475,8.185-8.71,21.691-0.525,30.165c8.185,8.475,21.691,8.71,30.165,0.525c0.178-0.172,0.353-0.347,0.525-0.525   l65.109-65.109c40.219,23.915,86.201,36.402,132.992,36.117c132.075,0,207.339-90.411,240.448-144.299   C517.405,277.151,517.405,234.515,496.543,200.771z M128.095,255.833c-0.121-70.575,56.992-127.885,127.567-128.006   c26.703-0.046,52.75,8.275,74.481,23.793l-30.976,30.976c-13.004-7.842-27.887-12.022-43.072-12.096   c-47.128,0-85.333,38.205-85.333,85.333c0.074,15.185,4.254,30.068,12.096,43.072l-30.976,30.976   C136.414,308.288,128.096,282.394,128.095,255.833z M256.095,383.833c-26.561-0.001-52.455-8.319-74.048-23.787l30.976-30.976   c13.004,7.842,27.887,12.022,43.072,12.096c47.128,0,85.333-38.205,85.333-85.333c-0.074-15.185-4.254-30.068-12.096-43.072   l30.976-30.976c41.013,57.434,27.702,137.242-29.732,178.255C308.845,375.558,282.798,383.879,256.095,383.833z" />
                      </g>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512.19 512.19"
                      width="24"
                      height="24"
                      fill="#6a6d6f"
                    >
                      <g>
                        <circle cx="256.095" cy="256.095" r="85.333" />
                        <path d="M496.543,201.034C463.455,147.146,388.191,56.735,256.095,56.735S48.735,147.146,15.647,201.034   c-20.862,33.743-20.862,76.379,0,110.123c33.088,53.888,108.352,144.299,240.448,144.299s207.36-90.411,240.448-144.299   C517.405,277.413,517.405,234.777,496.543,201.034z M256.095,384.095c-70.692,0-128-57.308-128-128s57.308-128,128-128   s128,57.308,128,128C384.024,326.758,326.758,384.024,256.095,384.095z" />
                      </g>
                    </svg>
                  )}
                </button>
              </div>

              <button
                disabled={loading}
                type="submit"
                className="d-flex justify-content-center btn-orange my-2 py-2"
              >
                {loading ? <div className="btn-loader-white"></div> : "Sign Up"}
              </button>

              <p className="text-center font-14">
                Already have an account?{" "}
                <button
                  type="button"
                  className="switch-btn font-bold text-orange"
                  onClick={() => setMode("signIn")}
                  disabled={loading}
                >
                  Sign In
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
