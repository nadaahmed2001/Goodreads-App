import React from "react";
import styled from "styled-components";
import Navbar from "../../../components/navbar";
import FooterPage from "../Footer/FooterPage";
import "animate.css";

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 50px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const CollageSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 250px);
  gap: 10px;
  grid-template-areas:
    "img2 img1"
    "img3 img1";

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      "img1"
      "img2"
      "img3";
  }
`;

const CollageImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;

  &:nth-child(1) {
    grid-area: img1;
  }
  &:nth-child(2) {
    grid-area: img2;
  }
  &:nth-child(3) {
    grid-area: img3;
  }
`;

const IntroSection = styled.div`
  padding: 20px;
  text-align: center;

  h1 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2rem;
    color: #555;
    line-height: 1.6;
    margin-bottom: 15px;
  }
`;

const TeamSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const TeamMember = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;

  &.reverse {
    flex-direction: row-reverse;
  }
`;

const MemberImageWrapper = styled.div`
  flex: 1 1 300px;
  padding: 20px;

  img {
    width: 100%;
    max-width: 350px;
    height: auto;
    border-radius: 25px;
    object-fit: cover;
  }
`;

const MemberInfoPrimary = styled.div`
  flex: 1 1 300px;
  padding: 20px;
  text-align: left;

  h2 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 15px;
  }

  p {
    font-size: 1.2rem;
    color: #555;
    line-height: 1.6;
  }
`;

const MemberInfoSecondary = styled.div`
  flex: 1 1 300px;
  padding: 20px;
  text-align: left;

  h2 {
    font-size: 2rem;
    margin-bottom: 15px;
    font-weight: bold;
  }

  p {
    font-size: 1.1rem;
    color: #666;
    line-height: 1.6;
    font-style: italic;
  }
`;

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <AboutContainer>
        <CollageSection>
          <CollageImage
            src='../../../public/login1.jpg'
            alt='Image 1'
            className='animate__animated animate__backInDown'
          />
          <CollageImage
            src='../../../public/login2.jpg'
            alt='Image 2'
            className='animate__animated animate__backInLeft'
          />
          <CollageImage
            src='../../../public/login3.jpg'
            alt='Image 3'
            className='animate__animated animate__backInRight'
          />
        </CollageSection>

        <IntroSection>
          <h2>Welcome to our platform!</h2>
          <p>
            We are a passionate team dedicated to building GoodReads – a place
            where book lovers can discover and share amazing reads.
          </p>
          <p>Thank you for being part of our journey. Happy reading!</p>
        </IntroSection>

        <TeamSection>
          <TeamMember className='animate__animated animate__backInLeft animate__delay-2s'>
            <MemberImageWrapper>
              <img src='../../../public/mano.png' alt='Mano' />
            </MemberImageWrapper>
            <MemberInfoPrimary>
              <p>
                Our mission is to connect readers with their favorite books and
                authors while creating an engaging, user-friendly experience. We
                combine our expertise in design and development to deliver a
                platform that is both innovative and easy to use.
              </p>
            </MemberInfoPrimary>
          </TeamMember>

          <TeamMember className='animate__animated animate__backInRight animate__delay-3s'>
            <MemberInfoPrimary>
              <p>
                Our team consists of experienced developers, designers, and book
                enthusiasts who collaborate to build a comprehensive and
                user-friendly platform.
              </p>
            </MemberInfoPrimary>
            <MemberImageWrapper>
              <img src='../../../public/hosam.png' alt='Hosam' />
            </MemberImageWrapper>
          </TeamMember>

          <TeamMember className='animate__animated animate__backInLeft animate__delay-4s'>
            <MemberImageWrapper>
              <img src='../../../public/fatma.png' alt='Fatma' />
            </MemberImageWrapper>
            <MemberInfoPrimary>
              <p>
                We strive to create a community where readers can explore
                diverse genres, share reviews, and discover new authors. Our
                mission is to foster a love for reading and continuous learning.
              </p>
            </MemberInfoPrimary>
          </TeamMember>

          <TeamMember className='animate__animated animate__backInRight animate__delay-5s reverse'>
            <MemberImageWrapper>
              <img src='../../../public/rahma.png' alt='Rahma' />
            </MemberImageWrapper>
            <MemberInfoSecondary>
              <p>
                Driven by innovation and creativity, we continuously enhance our
                platform to meet the evolving needs of readers. We believe that
                every book opens a new world of ideas and experiences, and we
                are committed to bringing these worlds closer together.
              </p>
            </MemberInfoSecondary>
          </TeamMember>

          <TeamMember className='animate__animated animate__backInLeft animate__delay-6s'>
            <MemberImageWrapper>
              <img src='../../../public/nada.jpeg' alt='Nada' />
            </MemberImageWrapper>
            <MemberInfoSecondary>
              <p>
                Together, we empower a vibrant community of readers by offering
                cutting-edge tools and engaging features that enrich the reading
                journey. Our commitment to excellence and passion for literature
                fuels our mission to make reading an inspiring and
                transformative experience.
              </p>
            </MemberInfoSecondary>
          </TeamMember>
        </TeamSection>
      </AboutContainer>
      <FooterPage />
    </>
  );
};

export default AboutUs;
