import React from 'react';
import styled from '@emotion/styled';
import Todos from './components/Todos';
import NotificationBtn from './components/NotificationBtn';
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
        <h1>Waker</h1>
        <NotificationBtn />
        <Todos />
      </Wrapper>
    </Layout>
  );
}
