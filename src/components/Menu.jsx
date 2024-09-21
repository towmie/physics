import styled from "styled-components";
import { navItems } from "../data";
import Container from "../ui/Container";
import HeaderContent from "../ui/HeaderContent";

const NavItem = styled.a`
  margin: 1rem 0;
  color: #fff;
  text-decoration: none;
  font-weight: bold;

  &:nth-child(5),
  &:nth-child(1) {
    opacity: 0.5;
    font-size: 3rem;
  }

  &:nth-child(2),
  &:nth-child(4) {
    opacity: 0.7;
    font-size: 4rem;
  }

  &:nth-child(3) {
    font-size: 5rem;
  }
`;

const HeaderWrapper = styled.div`
  padding: 1.5rem 1rem;
  border-bottom: 1px solid #fff;
`;

const StyledMenuList = styled.ul`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledMenu = styled.nav`
  position: absolute;
  transform: translateX(100%);
  right: 0;
  top: 0;
  height: 100vh;
  width: 100%;

  transition: transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 0.9);
  background-color: #ef281d;
  z-index: 9;
  &.active {
    transform: translateX(0);
  }
`;

function Menu({ isActive, setIsActive }) {
  return (
    <>
      <StyledMenu className={isActive ? "active" : ""}>
        <HeaderWrapper>
          <Container>
            <HeaderContent isActive={isActive} setIsActive={setIsActive} />
          </Container>
        </HeaderWrapper>
        <Container>
          <StyledMenuList>
            {navItems.map((item) => (
              <NavItem href={item.link} key={item.name} data-text={item.name}>
                {item.name}
              </NavItem>
            ))}
          </StyledMenuList>
        </Container>
      </StyledMenu>
    </>
  );
}

export default Menu;
