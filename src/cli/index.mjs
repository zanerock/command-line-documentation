import { cld } from './cld'

(async() => {
  const exitCode = await cld()
  process.exit(exitCode)
})()