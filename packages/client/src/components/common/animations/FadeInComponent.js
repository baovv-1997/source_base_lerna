import { useTransition, animated } from 'react-spring';

const WithFadeComponent = (Component) => {
  return (propsRoot) => {
    const transitions = useTransition(propsRoot.open, null, {
      enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
      from: { opacity: 0, transform: 'translate3d(10%,0,0)' },
      leave: { opacity: 0, transform: 'translate3d(10%,0,0)' },
    });

    return transitions.map(({ item, key, props }) =>
      item ? (
        <animated.div key={key} style={{ ...props, display: 'inherit' }}>
          <Component {...propsRoot} />
        </animated.div>
      ) : null
    );
  };
};

export default WithFadeComponent;
