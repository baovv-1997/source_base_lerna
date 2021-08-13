import { useState, useEffect } from 'react';

const Index = (variableValue, delayCounter = 500) => {
  const [variable, setVariable] = useState(variableValue);
  const [timeChangedNode, setTimeChangedNode] = useState(Date.now());

  useEffect(() => {
    const currentTime = Date.now();
    setTimeChangedNode(currentTime);
  }, [variable]);

  const setVariableWithDelay = (value) => {
    const currentTime = Date.now();

    const timeDiffBetween = (currentTime - timeChangedNode) / 1000;

    if (timeDiffBetween < delayCounter) {
      setTimeout(() => {
        setVariable(value);
      }, delayCounter - timeDiffBetween);

      return;
    }

    setVariable(value);
  };

  return [variable, setVariableWithDelay, setVariable];
};

export default Index;
