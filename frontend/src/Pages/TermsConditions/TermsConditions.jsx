import React from "react";
import Navbar from "../../../components/navbar";
import FooterPage from "../Footer/FooterPage";
import { Container, Card, ListGroup, Button } from "react-bootstrap";
import { Envelope, Book } from "react-bootstrap-icons";

export default function TermsAndConditions() {
  return (
    <>
      <Navbar />
      <Container className='my-5 py-4' style={{ maxWidth: "960px" }}>
        <Card className='shadow-lg border-0'>
          <Card.Header className='bg-primary text-white border-0'>
            <div className='d-flex align-items-center gap-3'>
              <Book size={32} />
              <h1 className='mb-0 display-5'>Terms & Conditions</h1>
            </div>
            <small className='text-light opacity-75'>
              Last updated: February 2025
            </small>
          </Card.Header>

          <Card.Body className='p-4'>
            {/* Table of Contents */}
            <Card className='mb-4 border-primary'>
              <ListGroup variant='flush'>
                <ListGroup.Item
                  action
                  href='#introduction'
                  className='text-primary'
                >
                  1. Introduction
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  href='#responsibilities'
                  className='text-primary'
                >
                  2. User Responsibilities
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  href='#property'
                  className='text-primary'
                >
                  3. Intellectual Property
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  href='#liability'
                  className='text-primary'
                >
                  4. Limitation of Liability
                </ListGroup.Item>
                <ListGroup.Item action href='#changes' className='text-primary'>
                  5. Changes to Terms
                </ListGroup.Item>
                <ListGroup.Item action href='#contact' className='text-primary'>
                  6. Contact Information
                </ListGroup.Item>
              </ListGroup>
            </Card>

            {/* Content Sections */}
            <section id='introduction' className='mb-5'>
              <h3 className='mb-3 text-primary border-bottom pb-2'>
                1. Introduction
              </h3>
              <p className='lead text-secondary'>
                Welcome to Book Sphere! By accessing or using our website, you
                agree to comply with and be bound by the following terms and
                conditions. If you do not agree, please do not use our services.
              </p>
            </section>

            <section id='responsibilities' className='mb-5'>
              <h3 className='mb-3 text-primary border-bottom pb-2'>
                2. User Responsibilities
              </h3>
              <p className='text-secondary'>
                You agree to use our services responsibly and not to engage in
                activities that could harm the platform or other users.
              </p>
            </section>

            <section id='property' className='mb-5'>
              <h3 className='mb-3 text-primary border-bottom pb-2'>
                3. Intellectual Property
              </h3>
              <p className='text-secondary'>
                All content, trademarks, and intellectual property on this site
                are owned by ITI-Team and may not be used without permission.
              </p>
            </section>

            <section id='liability' className='mb-5'>
              <h3 className='mb-3 text-primary border-bottom pb-2'>
                4. Limitation of Liability
              </h3>
              <p className='text-secondary'>
                We are not responsible for any damages or losses resulting from
                your use of our services.
              </p>
            </section>

            <section id='changes' className='mb-5'>
              <h3 className='mb-3 text-primary border-bottom pb-2'>
                5. Changes to Terms
              </h3>
              <p className='text-secondary'>
                We may update these terms at any time. Your continued use of the
                website constitutes your acceptance of the new terms.
              </p>
            </section>

            <section id='contact'>
              <h3 className='mb-3 text-primary border-bottom pb-2'>
                6. Contact Information
              </h3>
              <div className='d-flex align-items-center gap-2'>
                <Envelope className='text-primary' />
                <a
                  href='mailto:abdelrahmann.ramadann@gmail.com'
                  className='text-decoration-none link-primary'
                >
                  abdelrahmann.ramadann@gmail.com
                </a>
              </div>
            </section>
          </Card.Body>

          <Card.Footer className='bg-light border-0 py-3'>
            <div className='text-center text-muted small'>
              © 2025 Book Sphere. All rights reserved.
            </div>
          </Card.Footer>
        </Card>
      </Container>
      <FooterPage />
    </>
  );
}
