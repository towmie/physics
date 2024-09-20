import { useState } from "react";
import styled from "styled-components";

const StyledMenu = styled.nav`
  position: absolute;
  transform: translateX(100%);
  right: 0;
  top: 0;
  height: 100vh;
  max-width: 300px;
  width: 100%;
  background-color: #fff;
  transition: transform 0.3s;

  &.active {
    transform: translateX(0);
  }
`;

const StyledMenuButton = styled.button`
  position: relative;
  width: 48px;
  height: 48px;
  display: block;
  padding: 1rem 0.5rem;
  cursor: pointer;
  background-color: transparent;
  border: none;
  box-shadow: none;
  -webkit-appearance: none;
  order: 1;

  & span {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    display: block;
    pointer-events: none;
    width: 24px;
    &,
    &:before,
    &:after {
      height: 2px;
      background-color: #fff;
      transition: background-color 0.3s, transform 0.3s;
    }

    &:before,
    &:after {
      position: absolute;
      right: 0;
      content: "";
      width: 48px;
    }

    &:before {
      top: -7px;
    }

    &:after {
      top: 7px;
    }
  }

  &.active {
    & span {
      background-color: transparent;
      transition: background-color 0.1s ease-out;

      &:before,
      &:after {
        top: 0;
      }

      &:before {
        transform: rotate(45deg);
      }

      &:after {
        transform: rotate(-45deg);
      }
    }
  }
`;

function Menu() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <StyledMenuButton
        className={isActive ? "active" : ""}
        onClick={() => setIsActive(!isActive)}
      >
        <span></span>
      </StyledMenuButton>
      <StyledMenu className={isActive ? "active" : ""}>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Home</a>
          </li>
        </ul>
      </StyledMenu>
    </>
  );
}

export default Menu;
