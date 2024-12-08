import ArtistService from './artist';
import ArtsyClient from '../clients/artsy';
import prisma from '../prisma/connection';

const ImageService = {
    getAll: async () => {
        return await prisma.image.findMany();
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
    createByArtistSlug: async (
        slug: string,
    ) => {
        const data = await ArtsyClient.getArtist(slug);

        const artist = await prisma.artist.upsert({
            where: {
                slug: data.slug,
            },
            create: {
                artsyId: data.id,
                name: data.name,
                slug: data.slug,
            },
            update: {
                artsyId: data.id,
                name: data.name,
            }
        })

        const images = await ArtsyClient.getArtistImages(data.id, 10);

        for (const image of images) {

            if (image._links.thumbnail.href) {

                await prisma.image.upsert({
                    where: {
                        slug: image.slug,
                    },
                    create: {
                        slug: image.slug,
                        artistId: artist.id,
                        artsyId: image.id,
                        url: image._links.thumbnail.href,
                        title: image.title,
                        location: image.collecting_institution,
                        medium: image.medium,
                        date: image.date,
                    },
                    update: {
                        artistId: artist.id,
                        artsyId: image.id,
                        url: image._links.thumbnail.href,
                        title: image.title,
                        location: image.collecting_institution,
                        medium: image.medium,
                        date: image.date,
                    }
                });
            }
        }
    },
}
export default ImageService;