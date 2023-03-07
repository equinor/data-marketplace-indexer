import type { Asset, Maintainer } from '@equinor/data-marketplace-models'
import { toPlainText } from '@portabletext/toolkit'

import { IndexableAsset } from './types'

export const assetToIndexable =
  (maintainers: Maintainer[]) =>
  (asset: Asset): IndexableAsset => ({
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
    objectID: asset.id,
    owner: maintainers
      .filter((maintainer) => maintainer.role.name.toLowerCase() === 'owner')
      .map((maintainer) => `${maintainer.firstName} ${maintainer.lastName}`),
    provider: 'Collibra',
    qualityScore: 0,
    tags: asset.tags?.map((tag) => tag.label) ?? [],
    type: asset.type.name,
    updatedAt: new Date(asset.updatedAt).toJSON(),
    updateFrequency: toPlainText(asset.updateFrequency ?? []),
  })
