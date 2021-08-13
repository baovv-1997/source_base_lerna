import LoginComponent from 'components/login';
import ThemeWrapper from 'containers/themeWrapper';
import adminTheme from 'styles/theme/materialAdmin';
import { createContainer } from 'unstated-next';
import UseForm from 'hooks/useForm';
import withFormStore from 'hocs/withFormStore';
import useApiCaller from 'hooks/useApiCaller';
import { delay } from 'utilities/helper';
import withAuthentication from 'hocs/withAuthentication';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import actions from 'stores/actions';

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

export const FormStoreContainer = createContainer(
  UseForm({
    resolver: yupResolver(schema),
  })
);

const Index = () => {
  const { setLoading } = FormStoreContainer.useContainer();
  const dispatch = useDispatch();

  const { handleCallingAPI } = useApiCaller({ apiCaller: delay, setLoading });

  const submit = async () => {
    await handleCallingAPI(2000);
    dispatch(actions.authentication.setAuthenticated());
  };

  return (
    <ThemeWrapper theme={adminTheme}>
      <LoginComponent submit={submit} />
    </ThemeWrapper>
  );
};

const WithFormProvider = withFormStore(Index)(FormStoreContainer.Provider, FormStoreContainer);

export default withAuthentication(WithFormProvider);
