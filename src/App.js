import React from 'react';
import styled from '@emotion/styled';
import Todos from './components/Todos';
import NotificationBtn from './components/NotificationBtn';
import Now from './components/Now';
import Layout from './layout';

const Wrapper = styled.div`
  h1 {
    text-align: center;
  }
`;

export default function App() {
  return (
    <Layout>
      <Wrapper>
        <h1>Waker <NotificationBtn /></h1>
        <Now />
        <Todos />
      </Wrapper>
    </Layout>
  );
}
