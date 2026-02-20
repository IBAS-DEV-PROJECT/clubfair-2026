import LandingContainer from "../containers/landing/LandingContainer"
import styled from "styled-components";
import landingCoupleImage from '../assets/images/pixel_landing_couple.png';
import { colors } from "../styles/colors";


const Wrapper = styled.div`
  min-height: calc(100vh - 88px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding: 12px;

  > * {
    width: 90%;
  }
`;

const Title = styled.h1`
    font-size: 28px;
    font-weight: bold;
    color: ${colors.primary};
    text-align: center;
    margin: 0;
`;

const Subtitle = styled.h2`
    font-size: 20px;
    color: ${colors.canvasText};
    text-align: center;
    margin: 0;
    font-weight: 500;
`;

const CoupleImage = styled.img`
    width: 40%;
    max-width: 320px;
    margin: 16px 0;
`

const LandingPage = () => {
  return (
    <Wrapper>
      <Title>일촌 맺으러 가기</Title>
      <Subtitle>내 운명의 일촌은...?</Subtitle>
      <CoupleImage src={landingCoupleImage} alt='픽셀 커플' />
      <LandingContainer />
    </Wrapper>
  );
};

export default LandingPage;
