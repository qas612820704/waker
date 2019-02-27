import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import typography, { rhythm } from './typography';
import './theme.css';

const Wrapper = styled.div`
  margin: auto;
  padding: 0 ${rhythm(0.5)};
  max-width: ${rhythm(12)};
`;


export default function Layout({ children }) {
  useEffect(() => {
    typography.injectStyles();
  }, []);

  return (
    <div>
      <Wrapper>
      { children }
      </Wrapper>
    </div>
  );
}
