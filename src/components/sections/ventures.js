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
        I also founded{' '}
        <a href="https://labarisienne.ch" target="_blank" rel="noreferrer">
          La Barisienne
        </a>
        , a European investment vehicle we are setting up for pre-seed deep-tech: photonics,
        biosensing, robotics and medtech. Most of the companies I look at are in Switzerland and
        nearby.
      </p>

      <p>
        What I enjoy most here is sitting with the science and the people building it, not only the
        pitch. My day job is medical devices, and that curiosity is what I bring to this side of my
        work.
      </p>

      <p>
        If you are building something hard, raising a first round, or would simply like to compare
        notes on a company, I would love to hear from you.
      </p>

      <a className="site-link" href="https://labarisienne.ch" target="_blank" rel="noreferrer">
        labarisienne.ch
      </a>
    </StyledVenturesSection>
  );
};

export default Ventures;
