import ImageService from './image';
import ArtsyClient from '../clients/artsy';
import prisma from '../prisma/connection';

const ArtistService = {
    getAll: async () => {
        return await prisma.artist.findMany();
    },
    getBySlug: async (slug: string) => {
        return await prisma.artist.findUnique({ where: { slug }, include: { images: true } });
    },
    getById: async (id: number) => {
        return await prisma.artist.findUnique({ where: { id }, include: { images: true } });
    },
    createOrUpdate: async (slug: string) => {

        const artist = await ArtsyClient.getArtist(slug)

        return await prisma.artist.upsert({
            where: {
                slug: artist.slug,
            },
            create: {
                artsyId: artist.artsyId,
                name: artist.name,
                slug: artist.slug,
            },
            update: {
                artsyId: artist.artsyId,
                name: artist.name,
            }
        });
    },
    createOrUpdateImages: async (slug: string) => {
        await ImageService.createByArtistSlug(slug);
    },
}

export default ArtistService;