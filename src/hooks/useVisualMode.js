import React, { useState } from "react";

export default function useVisualMode(initial) {
  // const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);

  const transition = function (newMode, replace = false) {

    setHistory(prev => {
      if (replace === false) {
        return [...prev, newMode]
      } else {
        const newHistory = [...prev];
        newHistory.pop()
        newHistory.push(newMode);
        return newHistory;
      }
    })

    // setMode(prev => {
    //   [...prev, newMode]
    // })

  }
  
  const back = function () {
    setHistory(prev => {
      if (history.length === 1 ) {
        //console.log(history)
        const newHistory = [...prev];
        return newHistory
      }

      const newHistory = [...prev];
      newHistory.pop();
      // setMode(prev => {
      //   [...prev, newHistory[newHistory.length - 1]]
      // })
      return newHistory;
    })

    // setMode(newHistory[newHistory.length - 1])

  }
  
  const mode = history.slice(-1)[0];

  return {mode, transition, back}
}