# Minesweeper

This was my attempt to recreate Minesweeper. Once I got the basic game complete I decided to over-engineer it and split the UI out from the gameplay. So what I ended up with is a stand-alone minesweeper gameplay library and the ability to wrap arbitrary UIs around it. I'm quite pleased with the result. The first UI (see ./src/classic/) was a clone of the original version. But once I had the gameplay lib I decided to see what other UIs I could make. It's not the most creative attempt ever, but ultimately I created a text version of the game. Unlike the original it isn't timed and scores based on fewest moves.

Play it to your heart's content: https://noazark.github.io/minesweeper

## Development

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# run unit tests
npm test
```

## License

The MIT License (MIT)
Copyright (c) 2016 Noah H. Smith

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
