export default function formatTime(totalSeconds: number): string{
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
    const seconds = totalSeconds % 60

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
}