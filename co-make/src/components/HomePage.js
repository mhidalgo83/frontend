import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { faAngleUp, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import { fetchConcerns, addUpvote, zipSearch } from "../store/actions";
import { device } from "../utils/device";

const HomePageStyles = styled.div`
  font-family: "Quicksand", sans-serif;
  margin-top: 200px;
`;

const UpVotes = styled.div`
  width: 10%;
  display: flex;
  align-items: center;
  margin: 4%;
  .upvote {
    margin-left: 3%;
    &:hover {
      cursor: pointer;
    }
  }
`;
const StyledIssue = styled.div`
  background-color: #e5ebed;
  z-index: -1;
  display: flex;
  flex-direction: column-reverse;
  position: relative;
  width: 540px;
  margin: 0 auto;
  top: 20%;
  padding: 0;
  margin-top: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  // @media ${device.tablet} {
  //   margin: 0%;
  //   margin-top: 30px;
  // }

  // @media ${device.mobileM} {
  //   margin-top: 20px;
  // }
  &:hover {
    transition: 0.4s;
    box-shadow: 0 16px 16px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  div {
    min-width: 20%;
    text-align: left;
    img {
      max-width: 540px;
      max-height:810px;
      margin: 0 auto;
      padding:0;
    }

    h2{
      margin:4%;
    }

    p{
      margin:4%;
    }
  }
`;

const Search = styled.input`
  width: 50%;
  border-radius: 20px;
  border: none;
  padding: 0.7%;
  margin: 0 auto;
  outline: none;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  &:hover {
    transition: 0.4s;
    box-shadow: 0 16px 16px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: relative;
  right: 26%;
`;

const ImgCont = styled.div`
  display: flex;
  justify-content: center;
`;

const StickySearch = styled.div`
  position: fixed;
  top: 116px;
  width: 100%;
  background-color: #2b85a2;
  height: 200px;
`;

const Wrapper = styled.div`
  position: relative;
  top: 150px;
  margin-bottom: 2%;
`

const HomePage = () => {
  const [searchBy, setSearchBy] = useState("");
  const dispatch = useDispatch();
  const { concerns } = useSelector((state) => state);
  const { user, userLikes, isFetching } = useSelector((state) => state);
  // console.log(user);

  useEffect(() => {
    dispatch(fetchConcerns());
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(zipSearch(searchBy));
    setSearchBy("");
  };

  const handleChange = (e) => {
    setSearchBy(e.target.value);
  };

  return (
    <HomePageStyles>
      <StickySearch>
        <h1>Community Issues</h1>
        <Form onSubmit={handleSearch}>
          <Search
            type="text"
            name="search"
            value={searchBy}
            placeholder="Enter zip code"
            onChange={handleChange}
          ></Search>
          <SearchIcon onClick={handleSearch} icon={faSearch} />
        </Form>
      </StickySearch>
      <Wrapper>
        {concerns.length === 0 && !isFetching && (
          <h1>No issues in your area. Try another zip code.</h1>
        )}
        {isFetching && <h1>Loading...</h1>}
        {concerns.map((concern) => {
          return (
            <StyledIssue key={concern.id}>
              <UpVotes>
                <p>{concern.upvotes}</p>
                <FontAwesomeIcon
                  className="upvote"
                  onClick={() => {
                    console.log("Homepage 96", concern.id);
                    if (userLikes.length) {
                      if (
                        !userLikes.some((el) => el.concern_id === concern.id)
                      ) {
                        dispatch(addUpvote(user.id, concern.id));
                      }
                    } else {
                      dispatch(addUpvote(user.id, concern.id));
                    }
                  }}
                  icon={faAngleUp}
                />
              </UpVotes>
              <div>
                <h2>{concern.title}</h2>
                {concern.imageURL && (
                  <ImgCont>
                    <img
                      src={concern.imageURL}
                      alt="issue pic in comment"
                    ></img>
                  </ImgCont>
                )}
                <p>{concern.description}</p>
                <p>{concern.zip}</p>
              </div>
            </StyledIssue>
          );
        })}
      </Wrapper>
    </HomePageStyles>
  );
};

export default HomePage;
