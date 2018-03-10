import withAnimation from './with-animation'

export const fadeInOut = (component, timing) =>
  withAnimation(component, {
    transition: timing,
    animate: {
      opacity: [0, 1],
    },
  })

export const fadeIn = (component, timing) =>
  withAnimation(component, {
    transition: timing,
    animateIn: {
      opacity: [0, 1],
    },
  })

export const fadeOut = (component, timing) =>
  withAnimation(component, {
    transition: timing,
    animateOut: {
      opacity: [0, 1],
    },
  })
