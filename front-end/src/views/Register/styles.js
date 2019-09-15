import styled from 'styled-components';
import { device } from '../../config/devices';
export const Center = styled.div`
  display: flex;
  flex-direction: column
  width:50vw;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;
export const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #554433
  width:100%;
`;
export const StyledDropZone = styled.div`
  margin: 10;
  width: 15vw;
  height: 35vh;
  border: 2px solid #c6c6c6;
  border-style: dashed;
`;
export const Footer = styled.footer`
display: flex;
  margin-top: 2vh;
  width: 95vw;
  height: 5vh;
  border: 2px solid #c6c6c6;
  border-style: dashed;
  background-color: #e6e6e6;
  justify-content: center;
  font-weight: bold;
`
