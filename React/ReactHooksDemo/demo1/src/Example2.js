import React, { useState } from 'react';

function Example2() {
  const [age, setAge] = useState(20);
  const [sex, setSex] = useState('male');
  const [work, setWork] = useState('programmer');
  return (
    <div>
      <p>Horace -> age: {age}</p>
      <p>Horace -> sex: {sex}</p>
      <p>Horace -> work: {work}</p>
    </div>
  )
}

export default Example2;