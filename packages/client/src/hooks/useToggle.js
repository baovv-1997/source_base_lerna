import { useState } from 'react';

export default function useToggle(initialValue) {
  const [value, setValue] = useState(initialValue);

  const toggleValue = (newValue) => {
    if (typeof newValue === 'boolean') {
      setValue(newValue);
      return;
    }

    setValue(!value);
  };

  return [value, toggleValue];
}
