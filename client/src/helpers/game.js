
export const backupImages = ['https://d32dm0rphc51dk.cloudfront.net/sLk9dUSR9rK8VHKj8XwmiA/medium.jpg', 'https://d32dm0rphc51dk.cloudfront.net/nYda7YCiY06VYGVRvfgc4A/medium.jpg', 'https://d32dm0rphc51dk.cloudfront.net/YlIcfcosMKSItnQxsXpW6w/medium.jpg', 'https://d32dm0rphc51dk.cloudfront.net/cM62_1h4Szq9gFkLWti3og/medium.jpg', 'https://d32dm0rphc51dk.cloudfront.net/tAEiY881HVs_33crt6Swng/medium.jpg', 'https://d32dm0rphc51dk.cloudfront.net/mdk-UfAfmfx3axsi9IGBcg/medium.jpg', 'https://d32dm0rphc51dk.cloudfront.net/ldMX40edBZskPD-KF9015w/medium.jpg', 'https://d32dm0rphc51dk.cloudfront.net/i4Dkd3mp60XpKwoplsEUGA/medium.jpg', 'https://d32dm0rphc51dk.cloudfront.net/z2fgbNgHsEsrUTe0dR4g6g/medium.jpg', 'https://d32dm0rphc51dk.cloudfront.net/AeHNi1Yc3GZ9gET1vlxGxg/medium.jpg']

export const shuffle = (array) => {
    let temp = null
    let j = 0

    for (var i = 0; i < array.length; i++) {
        j = Math.floor(Math.random() * (i + 1))
        temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
}

export const initiateCards = (images) => {
    let originalCards = backupImages;
    if (images && images.length > 0) {
        originalCards = images.map(image => image.url)
        while (originalCards.length < 10) {
            let num = Math.floor(Math.random() * backupImages.length)
            if (!originalCards.find(image => image === backupImages[num])) {
                originalCards.push(backupImages[num])
            }
        }
    }

    //Test environment
    if (process.env.REACT_APP_MAX_CARDS > 0) {
        originalCards = originalCards.slice(0, process.env.REACT_APP_MAX_CARDS)
    }
    originalCards = shuffle(originalCards.concat(originalCards))

    let cards = []
    for (let i = 0; i < originalCards.length; i++) {
        cards[i] = {
            id: i,
            image: originalCards[i],
            isFlipped: false
        }
    }
    return cards;
}

export const checkGameOver = (cards) => {
    const unflippedCard = cards.find((card) => { return card.isFlipped === false })
    return !unflippedCard;
}