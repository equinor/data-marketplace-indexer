import crypto from 'node:crypto'

import type { Asset, Maintainer } from '@equinor/data-marketplace-models'
import { toPlainText } from '@portabletext/toolkit'
import { pipe } from 'fp-ts/lib/function'

import { IndexableAsset } from './types'

const createHash = (key: string) => (obj: object) =>
  pipe(crypto.createHash('sha-256').update(JSON.stringify(obj)).digest('hex').slice(0, 15), (hash) => `${hash}_${key}`)

const getAlgoliaObjectID = (asset: IndexableAsset) => pipe(asset, createHash('dashboard_generated_id'))

export const assetToIndexable =
  (maintainers: Maintainer[]) =>
  (asset: Asset): IndexableAsset =>
    pipe(
      {
        community: [asset.community.name],
        createdAt: new Date(asset.createdAt).toJSON(),
        dataOfficeAdmin: maintainers
          .filter((maintainer) => maintainer.role.name.toLowerCase() === 'data office admin')
          .map((maintainer) => `${maintainer.firstName} ${maintainer.lastName}`),
        dataSteward: maintainers
          .filter((maintainer) => maintainer.role.name.toLowerCase() === 'data steward')
          .map((maintainer) => `${maintainer.firstName} ${maintainer.lastName}`),
        description: toPlainText(asset.description ?? []),
        excerpt: toPlainText(asset.excerpt ?? []),
        id: asset.id,
        name: asset.name,
        objectID: null,
        owner: maintainers
          .filter((maintainer) => maintainer.role.name.toLowerCase() === 'owner')
          .map((maintainer) => `${maintainer.firstName} ${maintainer.lastName}`),
        provider: 'Collibra',
        qualityScore: 0,
        tags: asset.tags?.map((tag) => tag.label) ?? [],
        type: asset.type.name,
        updatedAt: new Date(asset.updatedAt).toJSON(),
        updateFrequency: toPlainText(asset.updateFrequency ?? []),
      } as IndexableAsset,
      (a) => ({ ...a, objectID: getAlgoliaObjectID(a) }),
    )
