import { times } from 'lodash'
import { initializeMap } from './lib/gameplay'
import { performance } from 'perf_hooks'

const beforeAll = process.memoryUsage().heapUsed

const maxSize = 2048
const maxMem = 262144 // 256MB
const runCount = 5

console.log(`size, bomb count, ${times(runCount, Number).map(i => `m${i+1}`).join(', ')}, time`);

for (let i=1; i <= maxSize; i++) {
  const size = i
  const memory = new Array(runCount)
  const bombCount = Math.floor(size * .2)
  const timeStart = performance.now()

  for (let j=0; j < runCount; j++) {
    const before = process.memoryUsage().heapUsed
    const map = initializeMap(size, size, bombCount)
    const after = process.memoryUsage().heapUsed

    const diff = after - before

    memory[j] = Math.round(diff / 1024)

    if (diff > maxMem) {
      break;
    }
  }

  const timeEnd = performance.now()
  const timeDiff = timeEnd - timeStart
  console.log(`${size}, ${bombCount}, ${memory.join(', ')}, ${timeDiff}`);
}

const afterAll = process.memoryUsage().heapUsed
console.log(`total: ${Math.round((afterAll - beforeAll) / 1024)} MB`);