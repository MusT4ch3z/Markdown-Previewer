import React from "react";
import TextArea from "antd/lib/input/TextArea";
import { useContext } from "react";
import TextContext from "../textContext";
import { debounce } from 'lodash'

function MarkedBlock() {
  const { text, setText } = useContext(TextContext);
  return (
    <div id="Editor">
      <div className="blockTitle">Enter your's markdown here:</div>
      <TextArea
        defaultValue={text}
        onChange={debounce(({ target: { value } }) => setText(value), 500)}
      >
      </TextArea>
    </div>
  )
}

export default MarkedBlock;