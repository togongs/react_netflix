import React, { useEffect, useState } from "react";
import { Badge, Col, Container, Row, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { movieAction } from "../redux/actions/movieAction";
import Pagination from "react-js-pagination";
import MovieList from "../components/MovieList";
import { pagination, search, getMovies } from "../redux/reducers/movieReducer";

const Movies = () => {
  const { popularMovies } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(0);
  const [query, setQuery] = useSearchParams();
  const [sort, setSort] = useState(null);
  const [title, setTitle] = useState("");
  // const [value, setValue] = useState("50");
  const [range, setRange] = useState({ min: 5, max: 10 });

  const moveToPage = (page) => {
    setPage(page);
    console.log(page);
  };

  // 페이지네이션
  useEffect(() => {
    setSize(popularMovies?.total_pages);
    dispatch(pagination({ page, size }));
  }, [page, size]);

  // 쿼리 서치
  // /movies page에 data 리스트업 해야한다
  // popularMovies state에 search한 api data를 update
  useEffect(() => {
    let searchQuery = query.get("query") || "";
    console.log("쿼리값은?", searchQuery);
    dispatch(getMovies());
    dispatch(search({ searchQuery }));
  }, [query]);

  const selectedItem = (eventKey, event) => {
    console.log("eventKey", eventKey);
    setTitle(event.target.text);
    dispatch(pagination({ page, size, eventKey }));
  };

  // 숫자 오름차순 return a - b
  // 숫자 내림차순 return b - a
  // 문자열 비교 b < a ? -1 : 1
  const sortMenu = [
    { title: "popularity(DESC)", key: 2 },
    { title: "popularity(ASC)", key: 3 },
    { title: "Release Day(RECENTLY)", key: 4 },
    { title: "Release Day(LATE)", key: 5 },
    { title: "Vote(DESC)", key: 6 },
    { title: "Vote(ASC)", key: 7 },
  ];

  const getRangeMovies = (value) => {
    setRange(value);
    let { min, max } = value;
    let maxNum = max.toString();
    console.log("maxNum", typeof maxNum);
    let minNum = min.toString();
    let data = [...popularMovies.results.map((item) => item.release_date)];
    console.log("data", data);
    // console.log("data", typeof data[0]);
    const list = data.filter((item) => minNum < item < maxNum);
    // list.map((item) => item.release_date);
    console.log("list map", list);
    // list.filter(value=>value);
  };
  useEffect(() => {}, []);

  return (
    <Container>
      <Row>
        <Col lg={4}>
          <Dropdown onSelect={selectedItem}>
            <Dropdown.Toggle
              variant="black"
              id="dropdown-basic"
              style={{
                fontSize: "16px",
                fontWeight: "500",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                border: "1px solid white",
                width: "300px",
                height: "60px",
              }}
            >
              {title ? title : "Sort"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {sortMenu.map((menu) => (
                <Dropdown.Item eventKey={menu.key}>{menu.title}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          {/* <form action=""> */}
          {/* <InputRange
            maxValue={2022}
            minValue={1990}
            // formatLabel={(value) => `$${value}`}
            value={range}
            onChange={getRangeMovies}
            onChangeComplete={(value) => console.log(value)}
          /> */}
          {/* </form> */}
        </Col>

        {/* 리스트 컴포넌트 분리 */}
        <Col lg={8}>
          <Row>
            <MovieList sort={sort} />
          </Row>
        </Col>

        <Pagination
          activePage={page} // 현재페이지
          itemsCountPerPage={10} // 한 페이지당 보여줄 아이템 개수
          totalItemsCount={size} // 총 아이템 갯수
          pageRangeDisplayed={5} // paginator 보여줄 범위
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={moveToPage} // 핸들링 함수
        />
      </Row>
    </Container>
  );
};

export default Movies;
