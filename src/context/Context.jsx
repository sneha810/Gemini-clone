// import { createContext } from "react";
// import run from "../config/Gemini";

// export const Context = createContext();
// const ContextProvider = (props) =>{


//     const onSent = async (prompt) =>{
//         await run(prompt)
//     }

//     onSent("what is react js")
//     const contextValue ={

//     }
//     return(
//         <ContextProvider>
//             {props.children}
//         </ContextProvider>
//     )
// }

// export default ContextProvider


import React, { createContext, useEffect, useState } from 'react';
import run from '../config/Gemini';

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput]= useState("");
    const [recentPrompt, setRecentPrompt]= useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] =useState(false);
    const [resultData, setResultData] =useState("");

//   useEffect(() => {
//     const fetchResponse = async () => {
//       await run("what is react js");
//     };
//     fetchResponse();
//   }, []); 
const delayPara = (index, nextWord)=>{
    setTimeout(function () {
        setResultData(prev=>prev+nextWord);
    },75*index)
}

const newChat = () =>{
    setLoading(false)
    setShowResult(false)
}
const onSent = async (prompt) =>{

    setResultData("")
    setLoading(true)
    setShowResult(true)
    let response;
    if (prompt!== undefined) {
        response = await run(prompt);
        setRecentPrompt(prompt)
    }else{
        setPrevPrompts(prev=>[...prev,input])
        setRecentPrompt(input)
        response = await run(input)
    }
    
    let responseArray = response.split("**");
    let newResponse="";
    for(let i= 0; i<responseArray.length; i++)
    {
        if (i === 0|| i%2 !== 1) {
            newResponse += responseArray[i];
        }
        else{
            newResponse += "<b>"+responseArray[i]+"</b>";
        }
    }
    let newResponse2 = response.split("*").join("<br/>")
    // setResultData(newResponse);
    let newResponseArray = newResponse2.split(" ");
    for(let i=0; i<newResponseArray.length; i++){
        const nextWord = newResponseArray[i];
        delayPara(i,nextWord+" ")
    }
    setLoading(false)
    setInput("")

}
  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  }

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
}

export default ContextProvider;
