import * as E from 'fp-ts/lib/Either'
import * as IO from 'fp-ts/lib/IO'

export type GetProcessEnvType = IO.IO<E.Either<string, string>>

// @TODO data marketplace models
export type IndexableAsset = {
  objectID: string | null
  createdAt: string
  excerpt: string
  description: string
  id: string
  name: string
  provider: 'Collibra' | 'PowerBI'
  qualityScore: number
  tags: string[]
  community: string[]
  type: string
  updatedAt: string
  updateFrequency: string
  dataOfficeAdmin: string[]
  dataSteward: string[]
  owner: string[]
}
