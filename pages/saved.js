import { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { getSavedCocktails } from '../api/SavedCocktailsApi';
import { useAuth } from '../utils/context/authContext';
import SavedCocktail from '../components/cards/SavedCocktail';

export default function SavedCocktails() {
  const [savedCocktails, setSavedCocktails] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getSavedCocktails(user.id).then(setSavedCocktails);
  }, [user]);

  return (
    <>
      <Tabs
        defaultActiveKey="unmade"
        id="made-unmade"
        className="mb-3"
      >
        <Tab eventKey="unmade" title="To try">
          <div id="unmade">
            {savedCocktails.unmadeCocktails?.map((cocktail) => (
              <SavedCocktail savedCocktail={cocktail} key={cocktail.id} />
            ))}
          </div>
        </Tab>
        <Tab eventKey="made" title="Made">
          <div id="made" className="column">
            {savedCocktails.madeCocktails?.map((cocktail) => (
              <SavedCocktail savedCocktail={cocktail} key={cocktail.id} />
            ))}
          </div>
        </Tab>
      </Tabs>
    </>
  );
}