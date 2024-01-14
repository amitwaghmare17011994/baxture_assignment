import { PUNCTUATION_REGX, WORD_REGX } from '@constants/index';

export const removePunctuation = (word: string) => {
    // Remove common punctuation characters
    return word.replace(PUNCTUATION_REGX, '').toLowerCase();

}

export const countWords = (content: string) => {
    if (content.trim().length === 0) {
        return 0;
    }
    return content.split(WORD_REGX).length;
}

export const countUniqueWords = (content: string) => {
    if (content.trim().length === 0) {
        return 0;
    }
    const wordsArray = content.split(WORD_REGX);
    // Use an object to count word occurrences
    const wordCount: Record<string, number> = {};
    const nonDuplicateWordsSet = new Set();

    wordsArray.forEach(word => {
        // Remove punctuation and convert to lowercase
        const cleanedWord = removePunctuation(word).toLowerCase();

        const count = wordCount[cleanedWord] || 0;
        wordCount[cleanedWord] = count + 1;

        if (count === 0) {
            // Add to the set if it's the first occurrence
            nonDuplicateWordsSet.add(cleanedWord);
        } else {
            // Remove from the set if it's a repeated occurrence
            nonDuplicateWordsSet.delete(cleanedWord);
        }
    });

    // Convert the Set back to an array (if needed)
    const nonDuplicateWordsArray = Array.from(nonDuplicateWordsSet);

    return nonDuplicateWordsArray.length;

}

export const findTopKWords = (content: string, options?: TopFreqOption) => {
    // Check options are there
    if (!options) {
        return ({ error: "Please provide valid options" })
    }

    if (!options.k) {
        return ({ error: "Please provide valid frequency count (k)" })
    }

    // Use an object to count word frequency
    const wordFrequency: Record<string, number> = {};

    content.split(/\s+/).forEach((word) => {
        wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });

    const result = Object.entries(wordFrequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, options.k)
        .map(([word, frequency]) => ({ word, frequency }));

    return result
}
