import React, { useEffect, useState, useCallback } from 'react';
import { Container } from '@mui/material';
import BCards from '../components/BCards';
import axios from 'axios';
import { useSnack } from '../../../app/providers/SnackBarProvider';
import AddNewItemButton from '../../../shared/components/AddNewItemButton';
import ROUTES from '../../../app/router/routesDictionary';
import { useCurrentUser } from '../../../app/providers/UserProvider';
import { getToken } from '../../users/services/localStorageService';
import { useSearchParams } from "react-router-dom";
import ENDPOINTS from '../../../shared/api/endpoints';
import PageHeader from '../../../shared/components/PageHeader';


function CardsPage() {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const setSnack = useSnack();
  const [searchParams] = useSearchParams();
  const { user } = useCurrentUser();

  const getCardsFromServer = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        ENDPOINTS.cards.all
      );
      setCards(response.data);
      setFilteredCards(response.data);
      setSnack('success', "All cards imported successfully"); 
    } catch (error) {
      console.error("Failed to fetch cards:", error);
      setSnack('error', "Failed to load cards");
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    getCardsFromServer();
  }, []);

  useEffect(() => {
    const q = searchParams.get("q");
    setFilteredCards(
      cards.filter((c) => c.title.includes(q) || c.subtitle.includes(q))
    );
  }, [searchParams]);

  const handleToggleLike = useCallback(async (cardId) => {
    try {
      const token = getToken();
      const response = await axios.patch(
        ENDPOINTS.cards.toggleLike(cardId),
        {},
        { headers: { 'x-auth-token': token } }
      );
      const updatedCard = response.data;

      // Update local state
      setCards((prev) =>
        prev.map((card) =>
          card._id === updatedCard._id ? updatedCard : card
        )
      );
      setFilteredCards((prev) =>
        prev.map((card) =>
          card._id === updatedCard._id ? updatedCard : card
        )
      );

    
      if (updatedCard.likes.includes(user._id)) {
        setSnack("success", "Card liked successfully!");
      } else {
        setSnack("info", "Card unliked successfully.");
      }

    } catch (err) {
      console.error("Like toggle failed", err);
      setSnack("error", "Failed to like card");
    }
  }, [user, setSnack]);
  
  return (
    <Container sx={{ paddingBottom: 10 }}>
      <PageHeader
        title="BCard"
        description="Browse and manage all your business cards in one place."
        highlightFirst
      />
      <BCards
        cards={filteredCards}
        setCards={setCards}
        onToggleLike={handleToggleLike}
        user={user}
        loading={isLoading}

      />
      {user && <AddNewItemButton to={ROUTES.createCard} text="Create" />}
    </Container>
  );

}

export default CardsPage;
