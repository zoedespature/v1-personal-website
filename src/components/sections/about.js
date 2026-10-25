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
  .places {
    margin: 0 0 15px;
    line-height: 1.3;

    .place {
      display: flex;
      align-items: baseline;
      gap: 10px;
      margin: 0;
      line-height: 1.3;

      /* Override global p spacing so rows sit like the old <br> list */
      &:not(:last-child) {
        margin-bottom: 0;
      }
    }

    img {
      width: 1em;
      height: 1em;
      flex-shrink: 0;
      position: relative;
      top: 0.15em;
    }
  }

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
      font-family: var(--font-mono), 'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji',
        sans-serif;
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

  const languages = [
    'French 👌',
    'English 👌',
    'German 👍',
    'Italian 🤌',
    'Swiss German 👌',
    'Dutch 🤏',
  ];

  // Twemoji images so flags render on Edge/Windows; text stays on the site font.
  const places = [
    { code: '1f1eb-1f1f7', alt: 'France', text: 'I was born in Bar-le-Duc, France' },
    { code: '1f1f8-1f1ec', alt: 'Singapore', text: 'I grew up in Singapore' },
    { code: '1f1ec-1f1e7', alt: 'United Kingdom', text: 'I studied in London, UK' },
    { code: '1f1f3-1f1f1', alt: 'Netherlands', text: 'I worked in Amsterdam, The Netherlands' },
    { code: '1f1e8-1f1ed', alt: 'Switzerland', text: 'Currently based in Bern, Switzerland' },
  ];

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
              When I take the engineer hat off, I look at companies. My brother and I founded{' '}
              <a href="https://labarisienne.ch" target="_blank" rel="noreferrer">
                La Barisienne
              </a>
              , a European investment vehicle for pre-seed deep-tech in biotech, photonics and
              robotics.
            </p>

            <div className="places">
              <p>A bit about myself:</p>
              {places.map(({ code, alt, text }) => (
                <div className="place" key={code}>
                  <img
                    src={`https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/${code}.png`}
                    alt={alt}
                    width={18}
                    height={18}
                    loading="lazy"
                  />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <p>I speak:</p>
          </div>

          <ul className="skills-list">
            {languages.map((language, i) => (
              <li key={i}>{language}</li>
            ))}
          </ul>
          <p>
            <br />
            If I am not behind my computer, I am most likely running, playing the piano or making
            sourdough bread.
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
