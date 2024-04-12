import bcrypt from 'bcrypt';
import {PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createUser(email: string, name: string, password: string, clubName: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const club = await prisma.club.findUnique({
    where: { name: clubName }
  });

  if (!club) {
    throw new Error("Club not found");
  }

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      clubId: club.id,
      isAccepted: false,  // L'utilisateur doit être accepté par le club
    }
  });
  return user;


}


// Fonction pour authentifier un utilisateur avec email et mot de passe
export async function authenticateUser(email: string, password: string): Promise<boolean | { id: number, email: string, name: string, isAccepted: boolean }> {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) return false; // Aucun utilisateur trouvé avec cet email

  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch && user.isAccepted) {
    // L'utilisateur est authentifié et accepté
    return { id: user.id, email: user.email, name: user.name, isAccepted: user.isAccepted };
  } else {
    // Mot de passe incorrect ou utilisateur non accepté
    return false;
  }
}

