import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import anime from 'animejs';
import { IconLoader } from '@components/icons';
import styled, { createGlobalStyle } from 'styled-components';
import { mixins } from '@styles';

// The page renders underneath the loader, so scrolling has to be locked while
// it is on screen. This is a global style rather than a Helmet body class
// because Menu also drives the body class, and the two would race.
const ScrollLock = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

const LoaderContainer = styled.div`
  ${mixins.flexCenter};
  background-color: var(--dark-navy);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
`;
const LogoWrapper = styled.div`
  width: max-content;
  max-width: 100px;
  transition: var(--transition);
  opacity: ${props => (props.isMounted ? 1 : 0)};
  svg {
    width: 100%;
    height: 100%;
    display: block;
    margin: 0 auto;
    fill: none;
    user-select: none;
    isolation: isolate;
    #underscore {
      opacity: 0;
    }
    path {
      mix-blend-mode: multiply;
    }
  }
`;

const Loader = ({ finishLoading }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);

  // Targets are scoped to this subtree rather than selected globally: the nav
  // renders its own logo at the same time, and '#logo path' would animate that
  // one away too.
  const animate = () => {
    const logo = logoRef.current && logoRef.current.querySelector('#loader-logo');

    // Without this the loader would cover the page forever. The content now
    // renders underneath, so skipping straight to the finished state just
    // shows the page.
    if (!logo) {
      finishLoading();
      return;
    }

    anime
      .timeline({ complete: () => finishLoading() })
      .add({
        targets: logo.querySelector('#underscore'),
        duration: 400,
        easing: 'easeInOutQuart',
        opacity: 1,
      })
      .add({
        targets: logo.querySelectorAll('path'),
        delay: 200,
        duration: 1000,
        easing: 'easeInOutQuart',
        strokeDashoffset: [anime.setDashoffset, 0],
      })
      .add({
        targets: logo,
        delay: 700,
        duration: 300,
        easing: 'easeInOutQuart',
        opacity: 0,
        scale: 0.1,
      })
      .add({
        targets: containerRef.current,
        duration: 20,
        easing: 'easeInOutQuart',
        opacity: 0,
        zIndex: -1,
      });
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);
    animate();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <LoaderContainer className="loader" ref={containerRef}>
      <ScrollLock />

      <LogoWrapper isMounted={isMounted} ref={logoRef}>
        <IconLoader />
      </LogoWrapper>
    </LoaderContainer>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
