import useFetch from "./useFetch";
import React, { useState, useEffect } from "react";

const useFormattedPage = (pageNumber) => {
  const { data } = useFetch(`verses/by_page/${pageNumber}?words=true`);
  // const [lines, setStateLines] = useState([]);
  // const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(null);
  useEffect(() => {
    const initializeLinesArray = () => {
      let lines = [];
      // initialze lines
      for (let i = 0; i < 15; i++) {
        lines.push([]);
      }
      return lines;
    };
    let lines = initializeLinesArray();
    // inner counter to get word index in a line, and to re initialize it if line changed, to start from 0 at new line
    const fillLines = () => {
      let innerCounter = 0;
      let curLineNum = 0;
      let aftLineNum = 0;
      let lineChange = false;
      // meta info

      let meta = {
        chapterCode: null,
        hizbNumber: data?.verses[0].hizb_number,
        juzNumber: data?.verses[0].juz_number,
        rubNumber: data?.verses[0].rub_el_hizb_number,
      };
      for (let i = 0; i < data?.verses?.length; i++) {
        let verses = data?.verses[i];
        let verseWords = verses?.words;
        let verseKey = verses?.verse_key.split(":");
        let verseChapter = verseKey[0];
        let currentVerse = verseKey[1];
        // font surahnames required three digits zero padded
        let chapterCode = ("00" + verseChapter).slice(-3);
        meta.chapterCode = chapterCode;
        if (currentVerse === "1") {
          lines[curLineNum][0] = { chapterNumber: chapterCode };
          // lines[curLineNum][0] = { chapterNumber: "" };
        }

        for (let j = 0; j < verseWords.length; j++) {
          curLineNum = verseWords[j]?.line_number;
          // if last word of verse this will return undefined
          aftLineNum = verseWords[j + 1]?.line_number;
          if (aftLineNum === undefined) {
            aftLineNum = data?.verses[i + 1]?.words[0]?.line_number;
          }
          lineChange = curLineNum !== aftLineNum;
          // let customWord = {
          //   code_v1: verseWords[j].code_v1,
          //   line_number: verseWords[j].line_number,
          //   text: verseWords[j].text,
          //   audio_url: verseWords[j].audio_url,
          // };
          if (!lineChange) {
            lines[curLineNum - 1][innerCounter] = verseWords[j];
            innerCounter = innerCounter + 1;
          }
          if (lineChange) {
            lines[curLineNum - 1][innerCounter] = verseWords[j];
            innerCounter = 0;
          }
        }
      }
      // setMeta(meta);
      // setStateLines(lines);
      setPage({
        meta,
        lines,
      });
    };
    fillLines();
  }, [pageNumber]);
  return { page };
};

export default useFormattedPage;
