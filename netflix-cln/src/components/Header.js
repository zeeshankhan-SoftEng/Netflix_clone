import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import {LOGO, SUPPORTED_LANGUAGES} from "./../utils/constants"
import {toggleGptSearchView} from "../utils/gptSlice"
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const showGptSearch  = useSelector((store)=>store.gpt.showGptSearch)
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
      })
      .catch((error) => {
        navigate("/error");
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsiubscribe when component unmounts
    return () => unsubscribe();
  },[]);
   const toggleSearchView = ()=>{
    dispatch(toggleGptSearchView())
   }
   const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="absolute w-screen px-4 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
           <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />

      {user && (
        <div className="flex p-4 justify-between">
          {showGptSearch && (
            <select
              className="p-2 m-2 bg-gray-900 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
        <button
            className=" px-2 mx-2 my-2  bg-purple-800 text-white rounded-lg"
         onClick={toggleSearchView}>{showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <img   
            className="hidden md:block w-12 h-15 mr-2 rounded-2xl"
          src={user?.photoURL} alt="Avatar" />
          <button
            className=" px-2 mx-2 my-2 font-bold text-white bg-red-600 w-28 h-12 rounded-lg"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
