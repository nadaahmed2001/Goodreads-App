import React from 'react';
import styled from 'styled-components';

const AdminTxt = () => {
    return (
        <StyledWrapper>
            <div className="button">
                <svg xmlns="http://www.w3.org/2000/svg">
                    <rect className="border" pathLength={100} />
                </svg>
                <div className="txt-upload">Admin Panel</div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .button {
    position: relative;
    width: 10rem;
    height: 3rem;
    cursor: pointer;
    border: none;
    background: none;
  }

  .button svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .border {
    width: 100%;
    height: 100%;
    stroke: white;
    stroke-width: 2px;
    fill: #0000;
    rx: 1em;
    ry: 1em;
    stroke-dasharray: 25;
    transition: fill 0.25s;
    animation: 4s linear infinite stroke-animation;
  }

  @keyframes stroke-animation {
    0% {
      stroke-dashoffset: 100;
    }
    to {
      stroke-dashoffset: 0;
    }
  }

  .txt-upload {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  }`;

export default AdminTxt;
