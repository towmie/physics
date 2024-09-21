import styled from "styled-components";
import Container from "../ui/Container";
import Menu from "./Menu";
import HeaderContent from "../ui/HeaderContent";
import { useState } from "react";

const StyledHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #fff;
  padding: 1.5rem 1rem;
  z-index: 10;
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function Header() {
  const [isActive, setIsActive] = useState(false);

  return (
    <StyledHeader>
      <Container>
        <StyledHeaderContainer>
          <HeaderContent isActive={isActive} setIsActive={setIsActive} />
          <Menu isActive={isActive} setIsActive={setIsActive} />
        </StyledHeaderContainer>
      </Container>
    </StyledHeader>
  );
}

export default Header;
