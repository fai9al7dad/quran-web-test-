import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function Surah() {
  // let { id } = useParams();
  const { data } = useFetch(`verses/by_page/6?words=true`);
  // const [linehaschanged, setlinehaschanged] = useState(false);
  const [stateLines, setStateLines] = useState([]);
  useEffect(() => {
    let lines = [];
    // initialze lines
    for (let i = 0; i < 15; i++) {
      lines.push([]);
    }
    console.log(`lines ${lines} length ${data?.verses?.length}`);
    // inner counter to get word index in a line, and to re initialize it if line changed, to start from 0 at new line
    let innerCounter = 0;
    let curLineNum = 0;
    let aftLineNum = 0;
    let lineChange = false;
    for (let i = 0; i < data?.verses?.length; i++) {
      let verseWords = data?.verses[i].words;
      for (let j = 0; j < verseWords.length; j++) {
        curLineNum = verseWords[j]?.line_number;
        // if last word of verse this will return undefined
        aftLineNum = verseWords[j + 1]?.line_number;
        if (aftLineNum === undefined) {
          aftLineNum = data?.verses[i + 1]?.words[0]?.line_number;
        }
        lineChange = curLineNum !== aftLineNum;
        // console.log(
        //   `line n${curLineNum} a${aftLineNum} w ${verseWords[j].translation.text} counter ${innerCounter}`
        // );
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
    setStateLines(lines);
  }, []);
  return (
    <div className="PageContainer">
      <div className="surahContainer">
        {stateLines.map((lines, lineIndex) => {
          return (
            <div key={lineIndex} className="lineContainer">
              {lines.map((word, wordIndex) => {
                return (
                  <div key={wordIndex} className="line">
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
