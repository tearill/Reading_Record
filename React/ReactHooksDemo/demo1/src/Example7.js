import React, { useState, useMemo } from 'react';

function Example7() {
  const [Horace1, setHorace1] = useState('Horace1 is waiting');
  const [Horace2, setHorace2] = useState('Horace2 is waiting');

  return (
    <div>
      <button onClick={() => {setHorace1(new Date().getTime())}}>Horace1</button>
      <button onClick={() => {setHorace2(new Date().getTime() + ', Horace2 来了')}}>Horace2</button>
      <ChildComponent name={Horace1}>{Horace2}</ChildComponent>
    </div>
  )
}

function ChildComponent({name, children}) {
  function changeHorace1() {
    console.log('他来了');
    return name + ', Horace1 来了'
  }

  const actionHorace1 = useMemo(() => changeHorace1(name), [name]);

  return (
    <>
      <div>{actionHorace1}</div>
      <div>{children}</div>
    </>
  )
}

export default Example7;