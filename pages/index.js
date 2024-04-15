/********************************************************************************** 
 * BTI425 – Assignment 6** I declare that this assignment is my own work in accordance with Seneca's* Academic Integrity Policy:** https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html** 
 * Name: Madhav Rajpal
 * Student ID: 112037221
 * Date: 22-03-2024
 * *********************************************************************************/
import { Inter } from "next/font/google";
import { Row, Col,Image } from 'react-bootstrap';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
     <div>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Image 
            src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" 
            fluid 
            rounded 
            width="2000" 
            height="2000"
          />
        </Col>
        <Col md={6}>
          <p>The Metropolitan Museum of Art of New York City, colloquially "the Met", is the largest art museum in the United States.</p>
          <p>Its permanent collection contains over two million works, divided among 17 curatorial departments.</p>
          <p>At the end of the description, include a link to the Wikipedia entry using:</p>
          <p><a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">Wikipedia Entry</a></p>
        </Col>
      </Row>
    </div>
    </>
  );
}
