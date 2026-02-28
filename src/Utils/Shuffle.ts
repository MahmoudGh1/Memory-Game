export default function shuffleCards(cards: string[]): string[]{
    let shuffled: string[] = [...cards, ...cards]
    let shuffledLength: number = shuffled.length
    let randomIndex: number = 0
    
    while(shuffledLength !== 0){
        randomIndex = Math.floor(Math.random() * shuffledLength)
        shuffledLength--;
        
        [shuffled[shuffledLength]!, shuffled[randomIndex]!] = [shuffled[randomIndex]!, shuffled[shuffledLength]!] 
    }
    
    return shuffled
}