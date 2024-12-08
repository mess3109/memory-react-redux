import ArtistService from './artist';
import prisma from '../prisma/connection';

const GameService = {
    getAll: async () => {
        return await prisma.game.findMany();
    },
    create: async (
        name: string,
        total: number,
        artistSlug: string,
    ) => {
        let artist = artistSlug ? await ArtistService.getBySlug(artistSlug) : null;
        return await prisma.game.create({
            data: {
                name: name,
                total: total,
                artistId: artist?.id,
            }
        });
    },
}

export default GameService;