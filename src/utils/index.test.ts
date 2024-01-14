import { countWords,countUniqueWords, removePunctuation } from ".";

describe('countWords', () => {
    it('should return 0 for an empty string', () => {
      const result = countWords('');
      expect(result).toEqual(0);
    });
  
    it('should return the correct word count for a given string', () => {
      const result = countWords('This is a test string');
      expect(result).toEqual(5);
    });
  });
  

  describe('countUniqueWords', () => {
    it('should return 0 for an empty string', () => {
      const result = countUniqueWords('');
      expect(result).toEqual(0);
    });
  
    it('should return the correct count of unique words for a given string', () => {
      const result = countUniqueWords('This is a test string. This is only a test.');
      expect(result).toEqual(2);
    });

    it('should return the correct count of unique words for a given multi line string string', () => {
        const result = countUniqueWords('This is a test string.\n This is only a test.\nThis is a test string,');
        expect(result).toEqual(1);
      });
  
  
  });
  


  describe('removePunctuation', () => {
    it('removes common punctuation characters and converts to lowercase', () => {
      const input = 'Hello, World! This is a Test.';
      const expectedOutput = 'hello world this is a test';
  
      const result = removePunctuation(input);
  
      expect(result).toEqual(expectedOutput);
    });
  
  });