import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledVenturesSection = styled.section`
  max-width: 700px;

  p {
    max-width: 600px;
  }

  .site-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 40px;
  }
`;

const Ventures = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, [prefersReducedMotion]);

  return (
    <StyledVenturesSection id="ventures" ref={revealContainer}>
      <h2 className="numbered-heading">Ventures</h2>

      <p>
        The other hat is{' '}
        <a href="https://labarisienne.ch" target="_blank" rel="noreferrer">
          La Barisienne
        </a>
        . It is a European investment vehicle, currently being set up, for pre-seed deep-tech in
        Europe: photonics, biosensing, robotics, medtech. Most of what I look at is in Switzerland
        and nearby.
      </p>

      <p>
        I spend my days building medical devices. That is the point. We read the science before the
        deck.
      </p>

      <p>
        If you are building something hard, raising a first round, or want a technical look at a
        file, I would like to hear from you.
      </p>

      <a className="site-link" href="https://labarisienne.ch" target="_blank" rel="noreferrer">
        labarisienne.ch
      </a>
    </StyledVenturesSection>
  );
};

export default Ventures;
