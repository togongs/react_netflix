import React, { useState } from "react";
import { Container, Form, Navbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const Navigation = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // 엔터 누를 시 영화검색
  const handleChange = (event) => {
    console.log("event", event);
    if (event.key === "Enter") {
      let keyword = event.target.value;
      console.log("keyword", keyword);
      // 입력한 검색어를 읽어와서 url을 바꿔준다 -> keyword를 가져와서 api에서 검사
      navigate(`/movies?query=${keyword}`);
    }

    setSearch(event.target.value);
    console.log("value is?", event.target.value);
  };

  // 서치버튼 클릭 시 영화검색
  const searchButton = (event) => {
    event.preventDefault();
    console.log("searchButton", search);
    navigate(`/movies?query=${search}`);
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            width={130}
            height={70}
            src="https://content.surfit.io/thumbs/image/wJW2K/w4VbJ/10552564055eb8333117a06.png/cover-center-2x.webp"
            alt=""
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "80px" }}
            navbarScroll
          >
            <Link to="/" className="nav-item">
              Home
            </Link>
            <Link to="/movies" className="nav-item">
              Movies
            </Link>
          </Nav>
          <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
            <Form.Control
              type="text"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onKeyPress={(event) => handleChange(event)}
              // value={search}
            />
            <Button variant="outline-danger" onClick={searchButton}>
              <BsSearch />
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
