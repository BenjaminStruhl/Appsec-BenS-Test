import React, { useState } from 'react';
import {
  useParams
} from "react-router-dom";

let convert = (input) => {
  let output = ""
  for (let i = 0; i < input.length; i++) {
      output += input[i].charCodeAt(0).toString(2) + " ";
  }
  return output
}

function Converter() {
  const { id } = useParams();
  let  inital_text = id === undefined ? "Your converted text will appear here" : id
  const [converted_text, setConvertedText] = useState(inital_text);
    return (
      <div>
        <h1>Evil Text to Binary Converter</h1>
        <div className="container_row">
        <div className="layer1" dangerouslySetInnerHTML={ {__html: converted_text}}></div>
        <textarea className="layer2" onChange={(e) => setConvertedText(e.target.value)}></textarea>
        <button className="layer3" onClick={() => {setConvertedText(convert(converted_text))}}>convert</button>
      </div>
      </div>
    );
  }
  
  export default Converter;
  