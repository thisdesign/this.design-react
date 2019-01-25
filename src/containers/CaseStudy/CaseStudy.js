import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
import NavChanger from './_NavChanger';
import Shim from './_Shim';
import CaseStudyCover from '../../components/CaseStudyCover/CaseStudyCover';
import Slices from './slices/Slices';
import './CaseStudy.scss';

const CaseStudy = ({
  doc, next, advanceQueue, isAnimating, isHome, handleOpen,
}) => {
  const title = `${doc.data.title} – This Design – Portland, OR`;
  const preserveNavColor = doc.data.preserve_white_nav === 'true';
  return (
    <CaseStudy.Wrapper
      className="casestudy"
      onClick={isHome ? handleOpen : null}
      next={next}
      isAnimating={isAnimating}
      isHome={isHome}
    >
      <CaseStudy.Body
        className="casestudy__body"
        textColor={doc.data.text_color}
        background={doc.data.background_color}
      >
        <CaseStudyCover data={doc.data} />
        {(!next && !isHome) && (
          <>
            <NavChanger disabled={preserveNavColor} />
            <Slices sliceData={doc.data.content} title={title} />
          </>
        )}
      </CaseStudy.Body>
      <Shim advanceQueue={advanceQueue} isHome={isHome} />
    </CaseStudy.Wrapper>
  );
};

const slideUp = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(0, -100vh, 0);
  }
`;

CaseStudy.Wrapper = styled.article`
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 30;
  position: relative;
  overflow: auto;
  transform: translate3d(0, 0, 0);

  ${props => props.home && css`
    height: 400px;
    overflow: hidden;
  `}

  ${({ next }) => next && css`
    z-index: 10;
    pointer-events: none;
    position: fixed;
  `}

  ${({ isAnimating, next, isHome }) => (isAnimating && !next) && css`
    animation: ${({ theme }) => {
    const time = theme.timing.csTransition;
    const ease = theme.ease.standard;
    const animName = isHome ? null : slideUp;
    return css`${time}ms ${animName} ${ease}`;
  }};
  `}
`;

CaseStudy.Body = styled.div`
  color: ${({ textColor }) => textColor};
  background-color: ${({ background, theme }) => (background || theme.color.caseStudyBg)}
  transform: translateZ(0);
  position: relative;
  padding-bottom: ${({ theme }) => theme.margin.lg}
`;

CaseStudy.propTypes = {
  doc: PropTypes.object.isRequired, //eslint-disable-line
  next: PropTypes.bool.isRequired,
  advanceQueue: PropTypes.func.isRequired,
  isAnimating: PropTypes.bool.isRequired,
  isHome: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
};

export default React.memo(CaseStudy);
