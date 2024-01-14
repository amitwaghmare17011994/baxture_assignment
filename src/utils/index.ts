import { WORD_REGX } from '../constants';

export const countWords=(content:string)=>{
    return  content.split(WORD_REGX).length;
}

export const countUniqueWords=(content:string)=>{
    const uniqueWords = new Set(content.split(WORD_REGX));
   return Array.from(uniqueWords).length;
}

export const findTopKWords=(content:string,options:TopFreqOption)=>{

    if(!options){
    return ({error:"Please provide valid options"})
    }
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