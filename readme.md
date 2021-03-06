# Example Usage

```javascript
import withAnimation from 'styled-animate'

const Foo = styled.div`
  /* some styles here */
`

const AnimatedFoo = withAnimation(Foo, {
  transition: '500ms linear',
  animate: {
    opacity: [0, 1]
  }
})

// then in a render function...
<AnimatedFoo in={this.state.showFoo} />
```

Or, using one of the convenient helper functions:

```javascript
import { fadeInOut } from 'styled-animate'

const Foo = styled.div`
  /* some styles here */
`

const AnimatedFoo = fadeInOut(Foo, '500ms linear')

// then in a render function...
<AnimatedFoo in={this.state.showFoo} />
```

Using the "animate" key will produce a react-transition-group <Transition> component that animates opacity from 0 to 1 on mount and from 1 to 0 on unmount, both animations lasting 500ms (parsed from the "transition" key). You may also use seconds as the unit of measure for the transition timing, like `transition: 2s ease-in`.

# Test Drive in Codesandbox.io!

https://codesandbox.io/s/20zqow283n

# API

Using the example above, `firstValue` and `secondValue` equal 0 and 1, respectively, and `property` equals "opacity"

* animate - animate `property` from `firstValue` to `secondValue` on mount, and from `secondValue` to `firstValue` on unmount.
* animateIn - animate `property` from `firstValue` to `secondValue` on mount
* animateOut - animate `property` from `secondValue` to `firstValue` on unmount
* animateSticky - animate `property` from `firstValue` to `secondValue` when `in` prop is truthy, and from `secondValue` to `firstValue` when `in` prop is falsy. Component stays mounted regardless of the value of the `in` prop.

For the first three in the list above, the component will mount immediately when the `in` prop is truthy.

Note that `property` can be any CSS property, and `firstValue` and `secondValue` can be any valid values for that property.

## Helper Methods

### Usage

`const AnimatedFoo = helperMethod(Foo, '500ms linear')`
The timing can also be passed as seconds, and the timing function ("linear" in the example above) can be any valid CSS transition timing function.

### Available Helper Methods

All of these are mounted and unmounted with the "in" prop (just like when using `animate`, `animateIn`, and `animateOut`).

* fadeIn - fades in
* fadeOut - fades out
* fadeInOut - fades in and fades out

## withDelay

Sometimes, you need a component to coordinate the timing of when it appears/disappears in relation to the animation of another component. You can use withDelay to accomplish this.

### Usage

```javascript
import Hello from './Hello'
import withDelay from './with-delay'

const DelayedHello = withDelay(Hello, '2000ms', 'both')

class App extends Component {
  state = {
    show: false,
  }

  render() {
    return (
      <div
        onClick={() => {
          this.setState({ show: !this.state.show })
        }}
      >
        <DelayedHello in={this.state.show} />
      </div>
    )
  }
}
```

As with the helper methods and the withAnimate API, a seconds (`2s`) or milliseconds (`400ms`) timing value can be passed to `withDelay`. The third parameter must be either `in`, `out`, or `both`. These are self-explanatory.

Play with withDelay on [codesandbox](https://codesandbox.io/s/1qjvwy51p4)

# Compatible components

You can use this on any component that forwards on the className prop. The [styled components docs](https://www.styled-components.com/docs/basics#styling-any-component) explanation applies here:

> The styled method works perfectly on all of your own or any third-party components as well, as long as they pass the className prop to their rendered sub-components, which should pass it too, and so on. Ultimately, the className must be passed down the line to an actual DOM node for the styling to take any effect.

# Upcoming features

* Allow passing an array of properties to animate, and allow passing different values for "entering" and "exiting" phases of animation:

```javascript
const Example = withAnimation(SomeComponent, {
  transition: 'opacity 1s ease-in-out',
  animate: [
    {
      opacity: [0, 1, 0.5]
    }, {
      'font-size': ['12px', '16px', '14px']
    }
  ]
}
```

* Automatically apply the animation to all children of a component

* Easily compose helper function animations together
