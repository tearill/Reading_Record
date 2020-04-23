import React from 'react';
import ShowArea from './showArea';
import Buttons from './Buttons';
import { Color } from './color';

function Example6() {
  return (
    <div>
      <Color>
        <ShowArea />
        <Buttons />
      </Color>
    </div>
  )
}

export default Example6;