import styled from "styled-components";
import Container from "../ui/Container";
import Menu from "./Menu";

const StyledHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #fff;
  padding: 1.5rem 1rem;
  z-index: 2;
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function Header() {
  return (
    <StyledHeader>
      <Container>
        <StyledHeaderContainer>
          <div>
            <img src="./vite.svg" />
          </div>

          <Menu />
        </StyledHeaderContainer>
      </Container>
    </StyledHeader>
  );
}

export default Header;
