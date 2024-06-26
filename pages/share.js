/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../utils/context/authContext';
import UserCard from '../components/cards/User';
import { getSingleUser } from '../api/UsersApi';
import { getPublicCocktails } from '../api/SavedCocktailsApi';
import SharedCocktail from '../components/cards/SharedCocktail';

function Share() {
  const { user, updateUser } = useAuth();
  const [appUser, setAppUser] = useState({});
  const [publicCocktails, setPublic] = useState([]);
  const ref = useRef();

  const getUser = () => {
    getSingleUser(user.id).then(setAppUser);
  };

  const getPublic = () => {
    getPublicCocktails().then(setPublic);
  };

  useEffect(() => {
    getUser();
    getPublic();
  }, [ref.current]);

  return (
    <div style={{
      display: 'flex', flexDirection: 'row', justifyItems: 'space-evenly', justifyContent: 'space-evenly',
    }}
    >
      <div className="column" style={{ width: '20%' }}>
        <UserCard user={appUser} updateUser={updateUser} />
      </div>
      <div className="column">
        <div className="d-flex justify-content-center">
          <h1 className="bi title m-3">What other users are trying now</h1>
        </div>
        {publicCocktails.map((cocktail) => (
          <SharedCocktail savedCocktail={cocktail} onUpdate={getPublic} key={cocktail.id} />
        ))}
      </div>
    </div>
  );
}
export default Share;
