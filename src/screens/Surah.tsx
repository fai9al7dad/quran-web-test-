import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function Surah() {
  // let { id } = useParams();
  const { data } = useFetch(`verses/by_page/7?words=true`);
  // const [linehaschanged, setlinehaschanged] = useState(false);
  const [stateLines, setStateLines] = useState([]);
  const initializeLinesArray = () => {
    let lines = [];
    // initialze lines
    for (let i = 0; i < 15; i++) {
      lines.push([]);
    }
    return lines;
  };
  useEffect(() => {
    let lines = initializeLinesArray();
    // console.log(`lines ${lines} length ${data?.verses?.length}`);

    // inner counter to get word index in a line, and to re initialize it if line changed, to start from 0 at new line
    const fillLines = async () => {
      let innerCounter = 0;
      let curLineNum = 0;
      let aftLineNum = 0;
      let lineChange = false;
      for (let i = 0; i < data?.verses?.length; i++) {
        let verses = data?.verses[i];
        let verseWords = verses?.words;
        let verseKey = verses?.verse_key.split(":");
        let verseChapter = verseKey[0];
        let currentVerse = verseKey[1];
        // font surahnames required three digits zero padded
        let zerofilled = ("00" + verseChapter).slice(-3);
        if (currentVerse === "1") {
          lines[curLineNum][0] = { chapterNumber: zerofilled };
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
          let customWord = {
            code_v1: verseWords[j].code_v1,
            line_number: verseWords[j].line_number,
            text: verseWords[j].text,
            audio_url: verseWords[j].audio_url,
          };
          if (!lineChange) {
            lines[curLineNum - 1][innerCounter] = customWord;
            innerCounter = innerCounter + 1;
          }
          if (lineChange) {
            lines[curLineNum - 1][innerCounter] = customWord;
            innerCounter = 0;
          }
        }
      }
      console.log(lines);

      setStateLines(lines);
    };
    fillLines();
  }, []);
  return (
    <div className="PageContainer">
      <div className="surahContainer">
        {/* <div className="surahname">002 surah</div> */}
        {stateLines.map((lines, lineIndex) => {
          return (
            <div key={lineIndex} className="lineContainer">
              {lines.map((word, wordIndex) => {
                return (
                  <div key={wordIndex} className="line">
                    {word?.chapterNumber ? (
                      <div className="surahname">
                        {word.chapterNumber}
                        <span>surah</span>
                      </div>
                    ) : null}
                    <span>{word?.code_v1}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/*


            <div className="lineContainer">
              {verseWords.map((word, innerIndex) => {
                let curLineNum = verseWords[innerIndex]?.line_number;
                let aftLineNum = verseWords[innerIndex + 1]?.line_number;
                let lineChange = curLineNum !== aftLineNum;
                // if (curLineNum !== befLineNum) {
                //   <br />;
                // }
                // console.log("c", curLineNum);
                // console.log("b", befLineNum);
                useEffect(() => {
                  setlinehaschanged(true);
                }, []);
                return (
                  <div className="word">
                    <span>{word.code_v1}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
*/
