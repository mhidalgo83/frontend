import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userConcerns } from "../store/actions";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-decoration: none;

  h1 {
    font-family: "Quicksand", sans-serif;
  }

  h2 {
    font-family: "Quicksand", sans-serif;
  }

  h3 {
    font-family: "Quicksand", sans-serif;
  }

  p {
    color: #9fb5bd;
    margin-top: 2%;
    font-size: 1rem;
    font-family: "Quicksand", sans-serif;
  }

  .link {
    text-decoration: none;
    color: white;
  }

  .concern-link {
    text-decoration: none;
    border: 2px solid #2b85a2;
    background-color: white;
    color: #2b85a2;
    border-radius: 4px;
    padding: 10px 10px;
    margin: 9%;
    font-weight: 700;
  }

  .list-item {
    margin: 5%;
  }
`;
const StyledProfile = styled.div`
  background-color: #e5ebed;
  width: 50%;
  height: auto;
  padding: 2%;
  margin-top: 10%;
  margin-bottom:2%;
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  
  flex-direction: column;

  align-items: left;

  .header{
    display:flex;
    align-items: center;
  }
  .title{
    width:80%;
    text-align:left;
    margin-left:2%;

    
  }
  .container{
    border-bottom: 1px solid black;
    margin:2%;
  }

  .details-container{
    text-align:left;
    margin:2%;
    margin-bottom:5%;

     .detail-text{
      font-family: "Quicksand", sans-serif;
      color:black;
  }

     }
  }

  .post-btn{

    button {
    width: 120%;
    background-color: #2b85a2;
    color: white;
    padding: 10px 10px;
    position: relative;
    right: 25%;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    font-family: "Quicksand", sans-serif;

  }

  }

  @media (max-width: 1000px){
    width:45%;
  }

  
`;

const SecondBackground = styled.div`
  .white-background {
    background-color: white;
    border-radius: 20px;
    border: 2px solid #2b85a2;
    padding: 2%;
  }
`;

const List = styled.ul`
  padding-left: 0;
`;

const ListItem = styled.li`
  list-style: none;
`;

const Profile = () => {
  const dispatch = useDispatch();
  const { user, usersConcerns } = useSelector((state) => state);
  console.log(user);



  useEffect(() => {
    dispatch(userConcerns(user.id));
  }, []);
  console.log(usersConcerns);
  return (
    <ProfileContainer>
      <StyledProfile>
        <SecondBackground>
          <div className="white-background">
            <div className="header">
              <div className="title">
                <h1>Welcome back, {user.username}</h1>
              </div>

              <div className="post-btn">
                <button>
                  <Link className="link" to="/postissue">
                    Post New Issue
                  </Link>
                </button>
              </div>
            </div>

            <div className="details-container">
              <h2>User Details</h2>
              <p>Username:</p>
              <p className="detail-text">{user.username}</p>
              <p>Email:</p>
              <p className="detail-text">{user.email}</p>
              <p>Zip Code:</p>
              <p className="detail-text">{user.zip}</p>
            </div>
          </div>
        </SecondBackground>

        <div className="container"> </div>
        <div className="concerns-container">
          <div className="concerns">
            {usersConcerns.length > 0 ? (
              <>
                <h3>Here is what you have added.</h3>

                <List className="list">
                  {usersConcerns.map(
                    (concern) => (
                      <ListItem className="list-item" key={concern.id}>
                        <Link
                          className="concern-link"
                          to={{
                            pathname: `/issue/${concern.id}`,
                            state: concern,
                          }}
                        >
                          {concern.title}
                        </Link>
                      </ListItem>
                    )
                    //
                  )}
                </List>
              </>
            ) : (
              <h3>
                You currently don't have any concerns about your community
                posted.
              </h3>
            )}
          </div>
        </div>
      </StyledProfile>
    </ProfileContainer>
  );
};

export default Profile;
