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
  }, []);

  const skills = [
    'French 👌',
    'German 👍',
    'English 👌',
    'Italian 🤌',
    'Swiss German 👌',
    'Dutch 🤏',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hello! My name is Zoë and I enjoy connecting with people just as much as I love tech.
              My interest in development started when I was 13 and my mom needed a website for her
              cooking class business. I was also a big fan of Grey's Anatomy (no comment) - what's a
              better combination of these subjects than &#10024;biotech&#10024;?
            </p>

            <p>
              A bit about myself: <br></br>
              🇫🇷 &emsp; I was born in Bar-le-Duc, France <br></br>
              🇸🇬 &emsp; I grew up in Singapore <br></br>
              🇬🇧 &emsp; I studied in London, UK <br></br>
              🇳🇱 &emsp; I worked in Amsterdam, The Netherlands <br></br>
              🇨🇭 &emsp; Currently based in Bern, Switzerland <br></br>
            </p>

            {/* <p>
              Fast-forward to today, and I’ve had the privilege of working at{' '}
              <a href="https://www.pathfindermed.com/">a biotech start-up</a>,{' '}
              <a href="https://developmental-biomechanics.org/">a university lab</a>,{' '}
              <a href="https://www.slb.com/">a huge corporation</a>, and{' '}
              <a href="https://www.virtualimperial.com/">a student-led Minecraft project</a>. My
              main focus these days is bringing the wide set of skills I gathered throughout these
              experiences to change the way we manage in biotech.
            </p>

            <p>
              I recently completed the{' '}
              <a href="https://irdeto.com/graduate-program/">Irdeto Graduate Program</a> in Software
              Engineering &amp; Cyber-Security, where I got to experience being a software engineer
              and a project manager in important company-wide projects.
            </p> */}

            <p>I speak:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
          <p>
            <br></br>If I'm not behind my computer, I'm most likely running, cycling, playing the
            piano or making sourdough bread.
          </p>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
