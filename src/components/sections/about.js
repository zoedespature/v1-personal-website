import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-md);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, [prefersReducedMotion]);

  const languages = ['French', 'English', 'German', 'Swiss German', 'Italian', 'Dutch'];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              I am an R&amp;D engineer at{' '}
              <a href="https://www.csem.ch/en/" target="_blank" rel="noreferrer">
                CSEM
              </a>{' '}
              in Bern, working on software and systems for medical devices. I trained as a
              biomedical engineer at{' '}
              <a href="https://www.imperial.ac.uk/" target="_blank" rel="noreferrer">
                Imperial College London
              </a>
              , and I am interested in the stretch between a device, the data it produces, and the
              people who have to use both.
            </p>

            <p>
              When I take the engineer hat off, I look at companies. I founded{' '}
              <a href="https://labarisienne.ch" target="_blank" rel="noreferrer">
                La Barisienne
              </a>
              , a European investment vehicle with a European focus in biotech, photonics and
              robotics — mostly, what is interesting in Switzerland and nearby.
            </p>

            <p>
              🇫🇷 &emsp; Born in Bar-le-Duc, France
              <br />
              🇸🇬 &emsp; Grew up in Singapore
              <br />
              🇬🇧 &emsp; Studied in London
              <br />
              🇳🇱 &emsp; Worked in Amsterdam
              <br />
              🇨🇭 &emsp; Now in Bern
            </p>

            <p>Languages</p>
          </div>

          <ul className="skills-list">
            {languages.map((language, i) => (
              <li key={i}>{language}</li>
            ))}
          </ul>
          <p>
            <br />
            Outside of work I run, cycle, play the piano, and bake sourdough.
          </p>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/zoedespature.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Zoe Despature"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
