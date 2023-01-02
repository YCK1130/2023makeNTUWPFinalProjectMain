import React from "react";
import Top from "./TopSection";
import Footer from "./Footer.js";
import { useMakeNTU } from "../../hooks/useMakeNTU";
import { useSelector, useDispatch } from "react-redux";
import { selectSession } from "../../slices/sessionSlice";


export default function Main() {
  const { WSINIT } = useMakeNTU();
  const { userID, authority } = useSelector(selectSession);

  WSINIT({id:userID, authority:authority});

  return (
    <div>
      <Top />
      <Footer />
    </div>
  );
}
