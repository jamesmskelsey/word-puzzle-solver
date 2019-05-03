var app = new Vue({
    el: '#app',
    data: {
      letters: "peachy",
      unfilteredOptions: [],
      MAXWORDLENGTH: 6
    },
    methods: {
      lettersAsArray: function() {
        
        let temp = this.letters;
        if ((this.letters.length > 0) && (this.letters.length < 6)) {
          for (let i = 0; i < this.letters.length; i++ ) {
            temp += " ";
          } 
          return temp.split("");
        } else if ((this.letters.length >= 6 && this.letters.length <= 10)) {
          return this.letters.split("");
        }
          return [];
      },
      // controller function - just gets a new copy of an array, resets
      // the option array, then runs the permutation finder
      runHeap: function() {
        let array = [...this.lettersAsArray()];
        this.unfilteredOptions = [];
        this.heapPerm(array, array.length, array.length);
        if (this.letters.length >= 6) {
          this.chopOptionsToFindPossibleWords(3);
        }
        this.chopOptionsToFindRealWords();
      },
      chopOptionsToFindRealWords: function() {
          
        this.unfilteredOptions = this.unfilteredOptions.filter(e => dictionary[e])
      },
      chopOptionsToFindPossibleWords: function(length) {
        let temp = [];
        for (let e of this.unfilteredOptions) {
          let word = e.slice(0,3);
          if (this.isWordAlreadyFound(temp, word)) {
            temp.push(word);
          }
          word = e.slice(0,4);
          if (this.isWordAlreadyFound(temp, word)) {
            temp.push(word);
          }
          word = e.slice(0,5);
          if (this.isWordAlreadyFound(temp, word)) {
            temp.push(word);
          }
        }
        this.unfilteredOptions = this.unfilteredOptions.concat(temp);
      },
      isWordAlreadyFound: function(array, word) {
        return array.find((e) => e == word) == undefined ? true : false;
      },
      // Function to take words from the permutation finder
      // and drop them in to the unfiltered options array
      collectWords: function(wordArray) {
        let word = wordArray.join("");
        let idx = word.indexOf(' ');
        if (idx != -1) {
          wordArray.splice(idx, wordArray.length)
        }
        word = wordArray.join("");
        if (word.length > 2) {
          
          if (this.isWordAlreadyFound(this.unfilteredOptions, word)) {
            this.unfilteredOptions.push(word);
          }
          
        }
        
      },
      // heaps algorithm permutation finder. look up "heap algorithm" for details
      heapPerm: function (array, size, n) {
        if (size == 1) {
          this.collectWords([...array]);
        }
        for (let i = 0; i<size; i++) {
          this.heapPerm(array, size-1, n);
  
          // if size is odd, swap first and last element
          if (size % 2 == 1) {
            let temp = array[0];
            array[0] = array[size-1];
            array[size-1] = temp;
          } else {
            // if size is even, swap ith and last element
            let temp = array[i];
            array[i] = array[size-1];
            array[size-1] = temp;
          }
        }
      }
    },
    computed: {
      
      optionsAlphabetical: function() {
        return this.unfilteredOptions.sort();
      }
    }
  })