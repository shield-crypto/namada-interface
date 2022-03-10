import styled from "styled-components/macro";

const transition = "all 0.3s ease-in-out";

export const ButtonContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 0 16px;
  background-color: ${(props) => props.theme.colors.yellow1};
  cursor: pointer;
  border: 2px solid ${(props) => props.theme.colors.buttonBorder};
  border-bottom: solid 4px ${(props) => props.theme.colors.buttonShadow};
  height: 50px;
  min-height: 50px;
  min-width: 48px;
  border-radius: 999px;
  font-weight: 600;
  transition: ${transition};
  &:hover {
    background-color: ${(props) => props.theme.colors.yellow1Hover};
    border: 2px solid ${(props) => props.theme.colors.buttonShadowHover};
    border-bottom: solid 4px ${(props) => props.theme.colors.buttonShadowHover};
  }
`;
