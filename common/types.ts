import * as E from 'fp-ts/lib/Either'
import * as IO from 'fp-ts/lib/IO'

export type GetProcessEnvType = IO.IO<E.Either<string, string>>

// @TODO data marketplace models
export type CollibraAsset = {
  objectID: string
  createdAt: string
  excerpt: string
  description: string
  id: string
  name: string
  provider: 'Collibra'
  qualityScore: number
  tags: string[]
  community: string[]
  type: 'Data Product'
  updatedAt: string
  updateFrequency: string
  dataOfficeAdmin: string[]
  dataSteward: string[]
  owner: string[]
}
