import { useEffect } from 'react';
import Router from 'next/router';

const Index = () => {
  useEffect(() => {
    Router.replace('/admin/dashboard');
  }, []);

  return null;
};

Index.layout = 'admin';

export default Index;
