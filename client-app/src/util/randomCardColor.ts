export function randomCardColor() {
  let randomNumber = Math.random()
  if (randomNumber < 0.25) return "blueCard"
  else if (randomNumber < 0.5) return "greenCard"
  else if (randomNumber < 0.75) return "pinkCard"
  else if (randomNumber <= 1) return "yellowCard"
  else return "orangeCard"
}