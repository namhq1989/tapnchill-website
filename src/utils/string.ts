const removeDotAtEnd = (sentence: string): string => {
  // Trim any whitespace at the end first
  const trimmedSentence = sentence.trim()

  // Then check and remove the dot if present
  if (trimmedSentence.endsWith('.')) {
    return trimmedSentence.slice(0, -1)
  }
  return trimmedSentence
}

export default removeDotAtEnd
