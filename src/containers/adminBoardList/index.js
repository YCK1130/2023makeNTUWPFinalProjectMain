import React from "react";
import TopBar from "./TopBar";
import BoardList from "./BoardList";
import Footer from "./Footer";

export default function BoardPage() {
  return (
    <div>
      <Footer />
      <BoardList />
      <Footer />
    </div>
  );
}
