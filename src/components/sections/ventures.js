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
        , a European investment vehicle we are setting up for pre-seed deep-tech: photonics,
        biosensing, robotics, medtech. Most of what I look at is in Switzerland and nearby.
      </p>

      <p>
        I still spend my days building medical devices, and that is what I want to bring to this
        side of the table: enough technical curiosity to sit with the science, not only the pitch.
      </p>

      <p>
        If you are building something difficult, raising a first round, or would like a technical
        conversation about a company, I would be glad to talk.
      </p>

      <a className="site-link" href="https://labarisienne.ch" target="_blank" rel="noreferrer">
        labarisienne.ch
      </a>
    </StyledVenturesSection>
  );
};

export default Ventures;
