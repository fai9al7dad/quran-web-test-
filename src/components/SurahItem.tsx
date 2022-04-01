import React from "react";
import { Link } from "react-router-dom";

function SurahItem({ surah }) {
  return (
    <Link to={`/${surah.id}`}>
      <div className="surahItem">{surah.name_simple}</div>
    </Link>
  );
}

export default SurahItem;
