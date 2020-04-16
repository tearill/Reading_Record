import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      // JSX 
      <ul className="my-list">
        <li>{false ? 'Horace' : 'Horace Test'}</li>
        <li>Love React</li>
      </ul>
    )
    // var child1 = React.createElement('li', null, 'Horace')
    // var child2 = React.createElement('li', null, 'Love React')
    // var root = React.createElement('ul', {className: 'my-list'}, child1, child2)
  }
}

export default App;