import { useEffect } from 'react';
import useMinimumDelay from 'hooks/useMinimumDelay';
import { removeUndefinedProps } from 'utilities/helper';
import { useSelector, useDispatch } from 'react-redux';
import { isFunction } from 'lodash';

export default function useApiCaller({ apiCaller, messageFail, messageSuccess, minimumDelay, setData, setLoading }) {
  const [isLoading, setIsLoadingWithDelay, setIsLoading] = useMinimumDelay(false, minimumDelay);
  const authenticationStore = useSelector((state) => state.authenticationStore || {});
  const dispatch = useDispatch();

  let hasRenewToken = false;

  useEffect(() => {
    if (isFunction(setLoading)) {
      setLoading(isLoading);
    }
  }, [isLoading]);

  const handleCallingAPI = async (...rest) => {
    setIsLoading(true);

    let data = rest;
    if (rest?.length === 1) {
      data = removeUndefinedProps(...rest);
      data = [data];
    }

    try {
      const responseData = await apiCaller(...data);

      if (!responseData?.data?.success) {
        throw responseData;
      }

      if (isFunction(setData)) {
        setData(responseData?.data?.data);
      }

      let contentMsg = messageSuccess;

      if (messageSuccess === true) {
        contentMsg = responseData?.message;
      }

      if (contentMsg) {
        dispatch({
          type: 'APP',
          payload: {
            snackBarConfig: {
              type: 'success',
              isShow: true,
              content: contentMsg,
              autoHideDuration: 5000,
            },
          },
        });
      }

      return responseData.data;
    } catch (ex) {
      if (!ex.status) {
        messageFail = 'Network connection Failed';
      }

      if (ex?.data?.statusCode == 402) {
        if (hasRenewToken) {
          authenticationStore.logout();
          return ex;
        }
        await authenticationStore.getCurrentUser();
        hasRenewToken = true;
        return handleCallingAPI(...rest);
      }
      let contentMsg = messageFail;

      if (messageFail === true) {
        contentMsg = ex?.data?.message;
      }

      if (contentMsg) {
        dispatch({
          type: 'APP',
          payload: {
            snackBarConfig: {
              isShow: true,
              type: 'error',
              content: contentMsg,
              duration: 8000,
            },
          },
        });
      }

      return ex;
    } finally {
      setIsLoadingWithDelay(false);
    }
  };

  return { isLoading, handleCallingAPI, setIsLoadingWithDelay, setIsLoading };
}
