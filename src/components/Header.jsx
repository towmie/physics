import styled from "styled-components";
import Container from "../ui/Container";
import { navItems } from "../data";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const NavItem = styled.a`
  font-size: 1rem;
  font-weight: 400;
  color: #fff;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  text-decoration: none;
`;

function Header() {
  const [hovered, setHovered] = useState(false);
  const [currentItem, setCurrentItem] = useState("");

  useEffect(() => {
    console.log(currentItem);
  }, [hovered]);

  //   useGSAP(() => {
  //     if (hovered) {
  //       console.log(currentItem);

  //     }
  //   }, [hovered]);

  const divideSpans = (word) => {
    return word.split("").map((letter, index) => {
      return <span key={index}>{letter}</span>;
    });
  };

  return (
    <StyledHeader>
      <Container>
        <StyledNav>
          {navItems.map((item) => (
            <NavItem
              href={item.link}
              key={item.name}
              onMouseEnter={() => {
                setHovered(true);
                setCurrentItem(item.name);
              }}
              onMouseLeave={() => {
                setHovered(false);
                setCurrentItem("");
              }}
            >
              {divideSpans(item.name)}
            </NavItem>
          ))}
        </StyledNav>
      </Container>
    </StyledHeader>
  );
}

export default Header;
