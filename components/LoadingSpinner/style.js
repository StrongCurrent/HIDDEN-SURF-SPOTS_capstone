import styled, { keyframes } from "styled-components";

const skCircleBounceDelay = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  } 40% {
    transform: scale(1);
  }
`;

const Circle = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 100px auto;
  width: 40px;
  height: 40px;

  .sk-child {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;

    &:before {
      content: "";
      display: block;
      margin: 0 auto;
      width: 15%;
      height: 15%;
      background-color: #2f6673;
      border-radius: 100%;
      animation: ${skCircleBounceDelay} 1.2s infinite ease-in-out both;
    }
  }

  ${Array.from({ length: 12 })
    .map(
      (_, i) => `
    .sk-circle${i + 2} {
      transform: rotate(${30 * (i + 1)}deg);
  
      &:before {
        animation-delay: ${-1.1 + 0.1 * i}s;
      }
    }
  `
    )
    .join("")}
`;

export default Circle;
