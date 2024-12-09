import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    await prisma.artist.upsert({
        where: { slug: 'egon-schiele' },
        update: {},
        create: {
            slug: 'egon-schiele',
            name: 'Egon Schiele',
            artsyId: '4d8b92834eb68a1b2c0001a0',
            images: {
                create: [{
                    artsyId: '515bb223cd4b8ed0b90014a7',
                    slug: 'egon-schiele-dancer-die-tanzerin',
                    title: 'Dancer (Die Tänzerin)',
                    url: 'https://d32dm0rphc51dk.cloudfront.net/yCsq0Uq-rUQ5FuTVM--FPA/medium.jpg',
                    date: '1913',
                    location: 'National Gallery of Art, Washington D.C.',
                    medium: 'Watercolor and gouache over graphite on wove paper',
                },
                {
                    artsyId: '515d69bb7b7057eb4c004c78',
                    slug: 'egon-schiele-dr-koller',
                    title: 'Dr. Koller',
                    url: 'https://d32dm0rphc51dk.cloudfront.net/vYQhFSCkp_IU5WuVCP0TYQ/medium.jpg',
                    date: 'ca. 1918',
                    location: 'National Gallery of Art, Washington D.C.',
                    medium: 'Charcoal on japan paper',
                },
                {
                    artsyId: '516ddf2bfdc441dbf0000374',
                    slug: 'egon-schiele-dr-ernst-wagner',
                    title: 'Dr. Ernst Wagner',
                    url: 'https://d32dm0rphc51dk.cloudfront.net/6H7dWokdUwCIZgSeogCsiQ/medium.jpg',
                    date: '1918',
                    location: 'National Gallery of Art, Washington D.C.',
                    medium: 'Black crayon on wove paper',
                },
                {
                    artsyId: '59bd5a2dcd530e4d6a6be6f4',
                    slug: 'egon-schiele-self-portrait-1',
                    title: 'Self-Portrait',
                    url: 'https://d32dm0rphc51dk.cloudfront.net/qEUzcI_Dn1ktfa_P5kET_A/medium.jpg',
                    date: '1911',
                    location: '',
                    medium: 'Watercolor, gouache, and graphite on paper',
                },
                {
                    artsyId: '59bd5a2f7622dd4d6e19f820',
                    slug: '59bd5a2f7622dd4d6e19f820',
                    title: 'Seated Woman, Back View',
                    url: 'https://d32dm0rphc51dk.cloudfront.net/kk2HH-NUzE5kMNjwkRft3g/medium.jpg',
                    date: '1917',
                    location: '',
                    medium: 'Watercolor, gouache, and graphite on paper',
                }],
            },
        },
    })

}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })