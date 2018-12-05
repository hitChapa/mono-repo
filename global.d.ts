/**
 * Created by hitesh.c on 18/11/17.
 */
declare module 'config' {
  const config: Config
  export = config
}

declare module '*.json' {
  const value: any
  export default value
}

declare module 'body-parser' {
  const bodyParser: BodyParser

  interface BodyParser {
    json: () => {(): void}
  }

  export = bodyParser
}

declare module 'merge-graphql-schemas' {
  const fileLoader: any
  const mergeTypes: any
  const mergeSchemas: any
  const mergeResolvers: any
}

/**
 * Configurations
 */
interface Config {
  port: number
  api: string
}

declare module 'ramda' {
  const R: any
  export = R
}
