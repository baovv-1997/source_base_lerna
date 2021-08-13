import { useForm, DefaultValues } from 'react-hook-form';
import { useState } from 'react';
import { isFunction } from 'lodash';

const Index = (initialState) => () => {
  const [handleSubmitOrig, setHandleSubmitOrig] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const { handleSubmit, ...useFormReturn } = useForm(initialState);

  const formSubmit = handleSubmit((data) => {
    isFunction(handleSubmitOrig) && handleSubmitOrig(data);
  });

  const registerHandleSubmit = (funcCallback) => {
    setHandleSubmitOrig(() => funcCallback);
  };

  return {
    ...useFormReturn,
    submit: formSubmit,
    registerHandleSubmit,
    handleSubmit,
    setLoading,
    isLoading,
  };
};

Index.propTypes = DefaultValues;

export default Index;
