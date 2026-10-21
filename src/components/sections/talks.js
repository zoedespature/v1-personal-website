import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledTalksSection = styled.section`
  max-width: 900px;

  h2 {
    margin: 0 0 40px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    font-weight: 400;
  }
`;

const StyledGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
`;

const StyledTalk = styled.li`
  transition: var(--transition);

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .talk-inner {
        transform: translateY(-7px);
      }
    }
  }

  .talk-inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    min-height: 250px;
    padding: 2rem 1.75rem;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    transition: var(--transition);
  }

  .year {
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }

  .title {
    margin: 16px 0 8px;
    color: var(--lightest-slate);
    font-size: var(--fz-xl);
    font-weight: 600;
    line-height: 1.3;

    a {
      position: static;

      &:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }

  .meta {
    margin: 0;
    color: var(--slate);
    font-size: var(--fz-sm);
    line-height: 1.4;
  }

  .link {
    ${({ theme }) => theme.mixins.flexCenter};
    margin-top: auto;
    padding-top: 20px;
    color: var(--light-slate);

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const Talks = () => {
  const data = useStaticQuery(graphql`
    query {
      talks: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/talks/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              date
              title
              event
              location
              url
            }
          }
        }
      }
    }
  `);

  const talks = data.talks.edges;
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, [prefersReducedMotion]);

  return (
    <StyledTalksSection id="talks" ref={revealContainer}>
      <h2>Talks</h2>

      <StyledGrid>
        {talks.map(({ node }, i) => {
          const { date, title, event, location, url } = node.frontmatter;
          const year = date ? new Date(date).getFullYear() : '';
          const meta = [event, location].filter(Boolean).join(', ');

          return (
            <StyledTalk key={i}>
              <div className="talk-inner">
                <span className="year">{year}</span>
                <h3 className="title">
                  {url ? (
                    <a href={url} target="_blank" rel="noreferrer">
                      {title}
                    </a>
                  ) : (
                    title
                  )}
                </h3>
                {meta && <p className="meta">{meta}</p>}
                {url && (
                  <span className="link" aria-hidden="true">
                    <Icon name="External" />
                  </span>
                )}
              </div>
            </StyledTalk>
          );
        })}
      </StyledGrid>
    </StyledTalksSection>
  );
};

export default Talks;
