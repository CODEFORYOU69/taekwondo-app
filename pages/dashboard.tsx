// pages/dashboard.tsx
import React, { useState } from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import AddFighterModal from '../components/AddFighterModal';
import AddCompetitionModal from '../components/AddCompetitionModal';

const Dashboard = () => {
  // État pour gérer l'ouverture/fermeture des modales
  const [openFighterModal, setOpenFighterModal] = useState(false);
  const [openCompetitionModal, setOpenCompetitionModal] = useState(false);

  // Fonctions pour gérer l'ouverture et la fermeture des modales Fighter
  const handleOpenFighterModal = () => setOpenFighterModal(true);
  const handleCloseFighterModal = () => setOpenFighterModal(false);

  // Fonctions pour gérer l'ouverture et la fermeture des modales Competition
  const handleOpenCompetitionModal = () => setOpenCompetitionModal(true);
  const handleCloseCompetitionModal = () => setOpenCompetitionModal(false);

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        {/* Assurez-vous que le clubName est géré correctement ailleurs dans votre app */}
        {/* <Typography variant="subtitle1">{clubName}</Typography> */}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleOpenFighterModal}>
          Add Fighter
        </Button>
        <Button variant="contained" color="primary" onClick={handleOpenCompetitionModal}>
          Add Competition
        </Button>
        {/* Les autres boutons pour "My Fighters" et "My Competitions" pourraient également être ajoutés ici */}
      </Box>

      {/* Modales pour ajouter des combattants et des compétitions */}
      <AddFighterModal open={openFighterModal} handleClose={handleCloseFighterModal} />
      <AddCompetitionModal open={openCompetitionModal} handleClose={handleCloseCompetitionModal} />
    </Container>
  );
};

export default Dashboard;
