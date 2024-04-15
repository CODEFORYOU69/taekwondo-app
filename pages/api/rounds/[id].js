import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
    const matchId = parseInt(req.query.matchId);

    if (req.method === 'POST') {
        // Handling POST request to create a new round
        const { scoreBlue, scoreRed, victoryType, isWinner } = req.body;
        console.log("re.body:", req.body);
        try {
            const round = await prisma.round.create({
                data: {
                    matchId,
                    scoreBlue,
                    scoreRed,
                    victoryType,
                    isWinner: isWinner === 'yes' ? true : false
                }
            });
            res.status(201).json(round);
        } catch (error) {
            console.error('Failed to create a round:', error);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    } else if (req.method === 'PUT') {
        // Handling PUT request to update an existing round
        const { roundId, scoreBlue, scoreRed, victoryType, isWinner } = req.body;
        try {
            const round = await prisma.round.update({
                where: { id: parseInt(roundId) },
                data: {
                    scoreBlue,
                    scoreRed,
                    victoryType,
                    isWinner
                }
            });
            res.status(200).json(round);
        } catch (error) {
            if (error.code === 'P2025') {
                res.status(404).json({ message: 'Round not found' });
            } else {
                console.error('Failed to update the round:', error);
                res.status(500).json({ message: 'Internal Server Error', error: error.message });
            }
        }
    } else {
        res.setHeader('Allow', ['POST', 'PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
