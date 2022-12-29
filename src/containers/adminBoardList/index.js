import React from "react";
import ConsoleHeader from "./ConsoleHeader";
import BoardConsole from "./BoardConsole";
import ConsoleFooter from "./ConsoleFooter";
import { useState } from "react";

export default function BoardPage() {
  const [searchKeyWord, setKeyWord] = useState("");
  const [saving, setSaving] = useState(false);

  return (
    <div>
      <ConsoleHeader setSaving={setSaving} />
      <BoardConsole keyWord={searchKeyWord} saving={saving} />
      <ConsoleFooter setKeyWord={setKeyWord} />
    </div>
  );
}
