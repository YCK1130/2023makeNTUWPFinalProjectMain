import React from "react";
import ConsoleHeader from "./ConsoleHeader";
import BoardConsole from "./BoardConsole";
import ConsoleFooter from "./ConsoleFooter";
import { useState } from "react";

export default function BoardPage() {
  const [searchKeyWord, setKeyWord] = useState("");
  return (
    <div>
      <ConsoleHeader />
      <BoardConsole keyWord={searchKeyWord} />
      <ConsoleFooter setKeyWord={setKeyWord} />
    </div>
  );
}
