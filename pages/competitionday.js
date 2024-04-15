import React, { useState, useEffect } from 'react';
import { Container, Typography, Select, MenuItem, Button } from '@mui/material';
import AddRoundModal from '../components/AddRoundModal';

export default function CompetitionDay() {
    const [competitions, setCompetitions] = useState([]);
    const [selectedCompetition, setSelectedCompetition] = useState(null);
    const [matches, setMatches] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);  // State to control modal visibility
    const [selectedMatch, setSelectedMatch] = useState(null);  // State to hold the currently selected match

    useEffect(() => {
        // Fetch competitions from API
        fetch('/api/competitions')
            .then(res => res.json())
            .then(data => setCompetitions(data))
            .catch(err => console.error('Error fetching competitions:', err));
    }, []);

    useEffect(() => {
        if (selectedCompetition) {
            // Fetch matches for the selected competition
            fetch(`/api/match?competitionId=${selectedCompetition.id}`)
                .then(res => res.json())
                .then(data => {
                    const sortedMatches = data.sort((a, b) => a.fightNumber - b.fightNumber);
                    setMatches(sortedMatches);
                })
                .catch(err => console.error('Error fetching matches:', err));
        }
    }, [selectedCompetition]);

    const handleCompetitionChange = (event) => {
        const competition = competitions.find(c => c.id === event.target.value);
        setSelectedCompetition(competition);
    };

    const openModal = (match) => {
        setSelectedMatch(match);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMatch(null);
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4">Competition Day Viewer</Typography>
            <Select
                value={selectedCompetition?.id || ''}
                onChange={handleCompetitionChange}
                fullWidth
                displayEmpty
                renderValue={selected => selected ? selectedCompetition.name : 'Select a competition'}
            >
                {competitions.map(competition => (
                    <MenuItem key={competition.id} value={competition.id}>
                        {competition.name}
                    </MenuItem>
                ))}
            </Select>
            <div>
                {matches.map(match => (
                    <div key={match.id} style={{ backgroundColor: match.color, padding: '10px', margin: '5px 0' }}>
                        <Typography variant="body1">
                            Fight #{match.fightNumber} - {match.fighter.firstName} {match.fighter.lastName}
                        </Typography>
                        <Button onClick={() => openModal(match)}>Manage Rounds</Button>
                    </div>
                ))}
            </div>
            {selectedMatch && (
                <AddRoundModal
                    open={isModalOpen}
                    onClose={closeModal}
                    match={selectedMatch}
                />
            )}
        </Container>
    );
}
