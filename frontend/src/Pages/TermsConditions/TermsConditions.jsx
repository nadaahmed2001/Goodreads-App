import React from "react";
import Navbar from "../../../components/navbar";
import FooterPage from "../Footer/FooterPage";
import { Container, Card, ListGroup, Button } from "react-bootstrap";
import { Envelope, Book } from "react-bootstrap-icons";

export default function TermsAndConditions() {
  return (
    <>
      <Navbar />
      <Container className='my-5 py-4 ' style={{ maxWidth: "960px" }}>
        <Card className='  border-0  bg-transparent'>
          <Card.Header className='m-auto   text-light mb-0   bg-transparent border-0'>
            <div className='d-flex align-items-center justify-center gap-3'>
              {/* <Book size={50} className='text-black-50  c-main' /> */}
              <h1 className='mb-0 display-5 c-main'>Terms & Conditions</h1>
            </div>
            <small className='text-black-50 opacity-75 fs-8  ms-3'>
              Last updated: February 2025
            </small>
          </Card.Header>

          <Card.Body className='p-4 '>
            {/* Table of Contents */}
            <Card className='mb-1 border-0 bg-transparent'>
              <ListGroup variant='flush' className='p-5 '>
                <ListGroup.Item
                  action
                  href='#introduction'
                  className='c-main p-3 rounded-5  '
                >
                  1. Introduction
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  href='#responsibilities'
                  className='c-main p-3 rounded-5'
                >
                  2. User Responsibilities
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  href='#property'
                  className='c-main p-3 rounded-5'
                >
                  3. Intellectual Property
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  href='#liability'
                  className='c-main p-3 rounded-5'
                >
                  4. Limitation of Liability
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  href='#changes'
                  className='c-main p-3 rounded-5'
                >
                  5. Changes to Terms
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  href='#contact'
                  className='c-main p-3 rounded-5'
                >
                  6. Contact Information
                </ListGroup.Item>
              </ListGroup>
            </Card>

            {/* Content Sections */}
            <section id='introduction' className='mb-5'>
              <h3 className='mb-3 p-3 rounded-5 bg-main text-light fs-4 border-bottom p-1'>
                1. Introduction
              </h3>
              <p className='lead text-secondary'>
                Welcome to Book Sphere! By accessing or using our website, you
                agree to comply with and be bound by the following terms and
                conditions. If you do not agree, please do not use our services.
              </p>
            </section>

            <section id='responsibilities' className='mb-5'>
              <h3 className='mb-3 p-3 rounded-5 bg-main text-light fs-4 border-bottom p-1'>
                2. User Responsibilities
              </h3>
              <p className='text-secondary'>
                You agree to use our services responsibly and not to engage in
                activities that could harm the platform or other users.
              </p>
            </section>

            <section id='property' className='mb-5'>
              <h3 className='mb-3 p-3 rounded-5 bg-main text-light fs-4 border-bottom p-1'>
                3. Intellectual Property
              </h3>
              <p className='text-secondary'>
                All content, trademarks, and intellectual property on this site
                are owned by ITI-Team and may not be used without permission.
              </p>
            </section>

            <section id='liability' className='mb-5'>
              <h3 className='mb-3 p-3 rounded-5 bg-main text-light fs-4 border-bottom p-1'>
                4. Limitation of Liability
              </h3>
              <p className='text-secondary'>
                We are not responsible for any damages or losses resulting from
                your use of our services.
              </p>
            </section>

            <section id='changes' className='mb-5'>
              <h3 className='mb-3 p-3 rounded-5 bg-main text-light fs-4 border-bottom p-1'>
                5. Changes to Terms
              </h3>
              <p className='text-secondary'>
                We may update these terms at any time. Your continued use of the
                website constitutes your acceptance of the new terms.
              </p>
            </section>

            <section id='contact'>
              <h3 className='mb-3 p-3 rounded-5 bg-main text-light fs-4 border-bottom p-1'>
                6. Contact Information
              </h3>
              <div className='d-flex align-items-center gap-2'>
                <Envelope className=' c-main  ms-2 ' />
                <a
                  href='mailto:abdelrahmann.ramadann@gmail.com'
                  className='text-decoration-none text-secondary  '
                >
                  abdelrahmann.ramadann@gmail.com
                </a>
              </div>
            </section>
          </Card.Body>

          {/* <Card.Footer className='bg-light border-0 py-3'>
            <div className='text-center text-muted small'>
              © 2025 Book Sphere. All rights reserved.
            </div>
          </Card.Footer> */}
        </Card>
      </Container>
      <FooterPage />
    </>
  );
}
