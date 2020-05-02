import React, { useState } from 'react'

function Styled() {
  const [color, setColor] = useState('blue')

  const changeColor = () => {
    setColor(color == 'blue' ? 'red' : 'blue')
  }

  return (
    <>
      <div>Horace</div>
      {/* <div className="horace">Horace11111</div> */}
      <div><button onClick={changeColor}>Change Color</button></div>
      <style jsx>
        {`
          div{color: ${color}}
        `}
      </style>
    </>
  )
}

export default Styled