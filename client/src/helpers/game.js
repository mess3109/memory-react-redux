
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

