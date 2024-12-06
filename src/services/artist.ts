import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

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
    createOrUpdate: async (data: {
        slug: string,
        artsyId: string,
        name: string,
    }) => {
        return await prisma.artist.upsert({
            where: {
                slug: data.slug,
            },
            create: {
                artsyId: data.artsyId,
                name: data.name,
                slug: data.slug,
            },
            update: {
                artsyId: data.artsyId,
                name: data.name,
            }
        });
    },
}

export default ArtistService;