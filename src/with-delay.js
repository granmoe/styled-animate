import React from 'react'
import Transition from 'react-transition-group/Transition'

export default (Component, timeoutString, timingOption) => {
  const delayIn = timingOption === 'both' || timingOption === 'in'
  const delayOut = timingOption === 'both' || timingOption === 'out'
  const [_, value, unit] = timeoutString.match(/(\d+)(m?s)/i)
  const enterTimeout =
    unit.toLowerCase() === 's' ? value * 1000 : parseInt(value, 10)
  const exitTimeout = delayOut ? enterTimeout : 0

  return ({ in: inProp, ...rest }) => (
    <Transition
      in={inProp}
      timeout={{
        enter: enterTimeout,
        entered: 0,
        exit: exitTimeout,
        exited: 0,
      }}
      unmountOnExit={true}
    >
      {state =>
        delayIn && state === 'entering' ? null : <Component {...rest} />
      }
    </Transition>
  )
}
