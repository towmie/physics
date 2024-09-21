import styled from "styled-components";

const MenuHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
    transition: width 0.3s ease-in-out;
    width: 24px;
  }

  &:hover span {
    transition: width 0.3s ease-in-out;
    width: 48px;
  }

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

function HeaderContent({ isActive, setIsActive }) {
  return (
    <MenuHeader>
      <div>
        <img src="./vite.svg" />
      </div>
      <StyledMenuButton
        className={isActive ? "active" : ""}
        onClick={() => setIsActive(!isActive)}
      >
        <span></span>
      </StyledMenuButton>
    </MenuHeader>
  );
}

export default HeaderContent;
