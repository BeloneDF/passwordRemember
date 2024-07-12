import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -500px 0;
  }
  100% {
    background-position: 500px 0;
  }
`;
export const SkeletonLoader = styled.div`
  display: inline-block;
  height: 1em;
  width: 100%;
  background: linear-gradient(
    to right,
    #f0f0f0 0%,
    #e0e0e0 20%,
    #f0f0f0 40%,
    #f0f0f0 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 4px;
  margin: 4px 0;
`;

export const Container = styled.section`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  height: 10%;
  border-radius: 10px;
  background-color: #fff;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: gray;
`;

export const TitleContainer = styled.section`
  display: flex;
  gap: 10px;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  width: 80%;
  height: 100%;
`;

export const ConfigContainer = styled.section`
  display: flex;
  gap: 10px;
  align-items: center;
  width: 20%;
  padding: 20px;
  height: 100%;
  flex-direction: row-reverse;
`;

export const Button = styled.button`
  border: none;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  background-color: transparent;
  transition: 0.3s;
  :hover {
    color: gray;
  }
`;
