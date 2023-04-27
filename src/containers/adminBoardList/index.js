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
  const [searchMethod, setSearchMethod] = React.useState("Name");
  const [delPageOpen, setDelPageOpen] = React.useState(false);
  const [delData, setDelData] = React.useState({});

  return (
    <div>
      <ConsoleHeader
        setSaving={setSaving}
        ableSave={ableSave}
        data={cards}
        delPageOpen={delPageOpen}
        setDelPageOpen={setDelPageOpen}
        delData={delData}
      />
      <BoardConsole
        keyWord={searchKeyWord}
        saving={saving}
        setSaving={setSaving}
        setAbleSave={setAbleSave}
        cards={cards}
        setCards={setCards}
        searchMethod={searchMethod}
        setDelPageOpen={setDelPageOpen}
        delData={delData}
        setDelData={setDelData}
      />
      <ConsoleFooter
        searchMethod={searchMethod}
        handleCheck={setSearchMethod}
        setKeyWord={setKeyWord}
      />
    </div>
  );
}
