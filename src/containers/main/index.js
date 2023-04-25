import React, { useEffect } from "react";
import Top from "./TopSection";
import Footer from "./Footer.js";
import { useMakeNTU } from "../../hooks/useMakeNTU";
import { useSelector } from "react-redux";
import { selectSession } from "../../slices/sessionSlice";

export default function Main() {
  const { subscribe, setNowPage } = useMakeNTU();
  const { teamID, authority } = useSelector(selectSession);
  useEffect(() => {
    setNowPage({ id: teamID, authority: authority, page: "main" });
    subscribe({ id: teamID, authority: authority, page: "main" });
  }, []);

  return (
    <div>
      <Top teamID={teamID} authority={authority} />
      <Footer />
    </div>
  );
}
