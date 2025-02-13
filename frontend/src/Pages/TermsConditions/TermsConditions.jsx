import React from "react";
import Navbar from "../../../components/navbar";
import FooterPage from "../Footer/FooterPage";
import { Container, Card, Accordion } from "react-bootstrap";
import { Envelope } from "react-bootstrap-icons";
import StartCanvas from "../../../components/canvas/Stars";
import styled from "styled-components";

const ContainerStyled = styled.div`
  background-color: var(--bg-beige) !important;
  position: relative;
  z-index: 1000;
`;

const Title = styled.h1`
  color: var(--border-botom);
`;

export default function TermsAndConditions() {
  return (
    <>
      <ContainerStyled>
        <Navbar />
        <StartCanvas />
        <Container className='  py-4' style={{ maxWidth: "960px" }}>
          <Card className='border-0 bg-transparent'>
            <Card.Header className='m-auto text-light mb-0 bg-transparent border-0'>
              <div className='d-flex align-items-center justify-center gap-3'>
                <Title className='mb-0 display-5 c-main'>
                  Terms & Conditions
                </Title>
              </div>
              <Title className='  opacity-75 fs-8 ms-3'>
                Last updated: February 2025
              </Title>
            </Card.Header>

            <Card.Body className='p-4'>
              {/* Accordion for Sections */}
              <Accordion defaultActiveKey='0' flush>
                {/* Introduction */}
                <Accordion.Item eventKey='0'>
                  <Accordion.Header className='accordion-header-custom'>
                    <h3 className='mb-0 fs-4'>1. Introduction</h3>
                  </Accordion.Header>
                  <Accordion.Body>
                    <p className='lead text-secondary'>
                      Welcome to Book Sphere! By accessing or using our website,
                      you agree to comply with and be bound by the following
                      terms and conditions. If you do not agree, please do not
                      use our services.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>

                {/* User Responsibilities */}
                <Accordion.Item eventKey='1'>
                  <Accordion.Header className='accordion-header-custom'>
                    <h3 className='mb-0 fs-4'>2. User Responsibilities</h3>
                  </Accordion.Header>
                  <Accordion.Body>
                    <p className='text-secondary'>
                      You agree to use our services responsibly and not to
                      engage in activities that could harm the platform or other
                      users.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>

                {/* Intellectual Property */}
                <Accordion.Item eventKey='2'>
                  <Accordion.Header className='accordion-header-custom'>
                    <h3 className='mb-0 fs-4'>3. Intellectual Property</h3>
                  </Accordion.Header>
                  <Accordion.Body>
                    <p className='text-secondary'>
                      All content, trademarks, and intellectual property on this
                      site are owned by ITI-Team and may not be used without
                      permission.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>

                {/* Limitation of Liability */}
                <Accordion.Item eventKey='3'>
                  <Accordion.Header className='accordion-header-custom'>
                    <h3 className='mb-0 fs-4'>4. Limitation of Liability</h3>
                  </Accordion.Header>
                  <Accordion.Body>
                    <p className='text-secondary'>
                      We are not responsible for any damages or losses resulting
                      from your use of our services.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>

                {/* Changes to Terms */}
                <Accordion.Item eventKey='4'>
                  <Accordion.Header className='accordion-header-custom'>
                    <h3 className='mb-0 fs-4'>5. Changes to Terms</h3>
                  </Accordion.Header>
                  <Accordion.Body>
                    <p className='text-secondary'>
                      We may update these terms at any time. Your continued use
                      of the website constitutes your acceptance of the new
                      terms.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>

                {/* Contact Information */}
                <Accordion.Item eventKey='5'>
                  <Accordion.Header className='accordion-header-custom'>
                    <h3 className='mb-0 fs-4'>6. Contact Information</h3>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className='d-flex align-items-center gap-2'>
                      <Envelope className='c-main ms-2' />
                      <a
                        href='mailto:abdelrahmann.ramadann@gmail.com'
                        className='text-decoration-none text-secondary'
                      >
                        abdelrahmann.ramadann@gmail.com
                      </a>
                    </div>
                    <br />
                    <div className='d-flex align-items-center gap-2'>
                      <Envelope className='c-main ms-2' />
                      <a
                        href='mailto:abdelrahmann.ramadann@gmail.com'
                        className='text-decoration-none text-secondary'
                      >
                        hossamzakaria1212@gmail.com
                      </a>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Card.Body>
          </Card>
        </Container>
      </ContainerStyled>
      <FooterPage />

      {/* Custom CSS for Green Highlight */}
      <style>
        {`
          .accordion-header-custom button:not(.collapsed) {
            background-color: #59461B !important; /* Green color */
            color: white !important; /* Text color */
          }

          .accordion-header-custom button {
            transition: background-color 0.3s ease, color 0.3s ease; /* Smooth transition */
          }
        `}
      </style>
    </>
  );
}
