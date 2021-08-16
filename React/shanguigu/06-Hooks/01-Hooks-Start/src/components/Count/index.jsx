import React, { useState, useEffect, useRef } from 'react'

export default function Count() {
  const [sum, setSum] = useState(0);
  const [name, setName] = useState('溜溜');
  const inputRef = useRef()

  const handleAdd = () => {
    // setSum(sum + 3);
    setSum(sum => sum + 3);
  };
  const handleChangeName = () => {
    setName(`${name}--${Date.now()}`);
  };

  useEffect(() => {
    console.log(1);
  }, [sum]);

  useEffect(() => {
    console.log(2);
  }, [name]);

  const handleGetInputValue = () => {
    alert(inputRef.current.value)
  };

  return (
    <div>
      <h2>当前求和：{ sum }</h2>
      <button onClick={ handleAdd }>点击+3</button>
      <h2>名字： { name }</h2>
      <button onClick={ handleChangeName }>点击改变name</button>
      <br />
      <input type="text" ref={ inputRef }/>
      <button onClick={ handleGetInputValue }>点击获取input的内容</button>
    </div>
  );
};
