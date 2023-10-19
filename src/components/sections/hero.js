import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import TypeAnimation from 'react-type-animation';

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

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Zoë Despature</h2>;
  const three = <h3 className="big-heading">I make technology human</h3>;
  const four = (
    <div style={{ margin: '20px 0 40px 0' }}>
      <p>
        I'm a biomedical engineer with the ambition to introduce people-centered values into the
        biotechnology landscape. I leverage my engineering degree from{' '}
        <a href="https://www.imperial.ac.uk/" target="_blank" rel="noreferrer">
          Imperial College London
        </a>{' '}
        and experience across different business functions to change the way we manage in biotech.
      </p>
    </div>
  );
  const five = <h1> ✨❯ I'm looking for a new opportunity in biotech! 🧬</h1>;
  const six = (
    <TypeAnimation
      speed={65}
      cursor={true}
      sequence={[
        '✨❯ As a Software Developer...',
        1000,
        '✨❯ As a Project Manager...',
        1000,
        '✨❯ As a Research Engineer...',
        1000,
      ]}
      wrapper="h1"
      repeat={Infinity}
    />
  );
  // const five = (
  //   <a
  //     className="email-link"
  //     href="https://www.linkedin.com/in/zoe-despature/"
  //     target="_blank"
  //     rel="noreferrer"
  //     style={{ margin: '40px 0 0 0'}}>
  //     Connect with me!
  //   </a>
  // );

  const items = [one, two, three, four, five, six];

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
