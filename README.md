# DOM Scroll Recycler

A ReactJS wrapper component to limit DOM elements rendered.

This component takes in an array of items and calculates the amount of items to render, this can be done simply with the heights of the items and the height of the container or it can be pre calculated by the user and passed as a function with takes the current position and number of elements to show.

# Installation

```
npm install dom-scroll-recycler
```

# Props

- **items** `React.PropTypes.array` - Array of JSX objects to render
- **itemHeight** `React.PropTypes.number` - The height of each item in the list
- **offset** `React.PropTypes.number` - The offset buffer that will allow for a more seamless scroll.
- **calculatePositionalValues** `React.PropTypes.func` - Function to calculate the start and end position, as well as the paddingTop. This overrides the basic list calculation. If not given the basic calculation is used.

Other props on the DomScrollRecycler component are passed to the container. For example styles or onClick.

# Example Usage

The example below renders a list with 100,000 items.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import DomScrollRecycler from 'dom-scroll-recycler';

class SingleItem extends React.Component {

  static propTypes = {
    id: PropTypes.number
  };


  render() {
    return(
      <div>
        This is {this.props.id}
      </div>
    );
  }
}

// Create 50,000 Example items
let items = [];
for (let i = 0; i <= 50000; i++) {
  items.push(<SingleItem index={i} />);
}

const onClickEvent = () => {
  //do something
};

ReactDOM.render(<DomScrollRecycler onClick={onClickEvent} items={items} itemHeight={20} offset={10} />, document.getElementById('list'));
```

So for example above, a list in a container sized 200px (this could be anything, it will figure it out once mounted), it will initially load 20 items, and will load a max of 30 in the DOM at any time.
