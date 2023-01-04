import React from "react";
import Top from "./TopSection";
import Footer from "./Footer.js";
import { useMakeNTU } from "../../hooks/useMakeNTU";
import { useSelector, useDispatch } from "react-redux";
import { selectSession } from "../../slices/sessionSlice";

export default function Main() {
  const { subscribe } = useMakeNTU();
  const { userID, authority } = useSelector(selectSession);
  subscribe({ id: userID, authority: authority, page: "main" });

  return (
    <div>
      <Top userID={userID} authority={authority} />
      <Footer />
    </div>
  );
}
