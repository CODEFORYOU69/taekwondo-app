import React, { useState } from 'react';
import { TextField, Button, Box, Container } from '@mui/material';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clubName, setClubName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const club = await prisma.club.create({
        data: {
          email,
          password,
          name: clubName,
        },
      });
      console.log('Club créé avec succès:', club);
      // Ajoute ici la redirection vers une page de confirmation
    } catch (error) {
      console.error('Erreur lors de la création du club:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 4,
        }}
      >
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Nom du club"
            value={clubName}
            onChange={(e) => setClubName(e.target.value)}
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary">
            inscription
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignUpForm;
