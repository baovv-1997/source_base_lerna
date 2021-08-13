import { DevTool } from '@hookform/devtools';

const WithFormDevTool = ({ formStoreContainer, children }) => {
  if (formStoreContainer && process.env.NEXT_PUBLIC_SHOW_FORM_TOOL == 'true') {
    const { control } = formStoreContainer.useContainer();

    return (
      <>
        <DevTool control={control} placement={'top-left'} />
        {children}
      </>
    );
  }

  return children;
};

const withFormStore = (Component) => (Provider, formStoreContainer) => (props) => {
  return (
    <Provider>
      <WithFormDevTool formStoreContainer={formStoreContainer}>
        <Component {...props} />
      </WithFormDevTool>
    </Provider>
  );
};

export default withFormStore;
