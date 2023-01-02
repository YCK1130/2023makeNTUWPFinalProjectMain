import React from "react";
import ConsoleHeader from "./ConsoleHeader";
import BoardConsole from "./BoardConsole";
import ConsoleFooter from "./ConsoleFooter";
import { useState } from "react";

export default function BoardPage() {
  const [searchKeyWord, setKeyWord] = useState("");
  const [saving, setSaving] = useState(false);
  const [ableSave, setAbleSave] = useState(false);
  const [cards, setCards] = useState([]);

  return (
    <div>
      <ConsoleHeader setSaving={setSaving} ableSave={ableSave} data={cards} />
      <BoardConsole
        keyWord={searchKeyWord}
        saving={saving}
        setSaving={setSaving}
        setAbleSave={setAbleSave}
        cards={cards}
        setCards={setCards}
      />
      <ConsoleFooter setKeyWord={setKeyWord} />
    </div>
  );
}
