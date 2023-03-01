import config from './jest.config'
const jestConfig = Object.assign({}, config, { testMatch: ['**/*.test.ts'] })
export default jestConfig
