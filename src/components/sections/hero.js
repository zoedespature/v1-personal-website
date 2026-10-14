import React, { useState, useEffect, useMemo } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { useIsLoading, usePrefersReducedMotion } from '@hooks';
import TypeAnimation from 'react-type-animation';
import { translations } from '@config';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 600px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const shuffleArray = array => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const isLoading = useIsLoading();
  const prefersReducedMotion = usePrefersReducedMotion();

  const seq = useMemo(
    () =>
      shuffleArray(translations).flatMap(greeting => [
        `✨❯ ${greeting.flag} 👋 ${greeting.text}`,
        1000,
        `✨❯`,
        1000,
      ]),
    [],
  );

  useEffect(() => {
    if (prefersReducedMotion || isLoading) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, [isLoading, prefersReducedMotion]);

  const one = <TypeAnimation cursor={true} sequence={seq} wrapper="h1" repeat={Infinity} />;
  const two = <h2 className="big-heading">Zoë Despature</h2>;
  const three = <h3 className="big-heading">R&D engineer, medical devices</h3>;
  const four = (
    <div style={{ margin: '20px 0 40px 0' }}>
      <p>
        Biomedical engineer from{' '}
        <a href="https://www.imperial.ac.uk/" target="_blank" rel="noreferrer">
          Imperial College London
        </a>
        . I work on the software and systems around clinical devices, currently at{' '}
        <a href="https://www.csem.ch/en/" target="_blank" rel="noreferrer">
          CSEM
        </a>{' '}
        in Bern.
      </p>
    </div>
  );

  const items = [one, two, three, four];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
