import type { Asset, Maintainer } from '@equinor/data-marketplace-models'
import { toPlainText } from '@portabletext/toolkit'
import * as A from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/function'

import { IndexableAsset } from './types'

const getMaintainerByRoleName = (roleName: string) => (maintainers: Maintainer[]) =>
  pipe(
    maintainers,
    A.filter((maintainer) => maintainer.role.name.toLocaleLowerCase() === roleName.toLowerCase()),
    A.map((maintainer) => `${maintainer.firstName} ${maintainer.lastName}`),
  )

export const assetToIndexable =
  (maintainers: Maintainer[]) =>
  (asset: Asset): IndexableAsset => ({
    community: [asset.community.name],
    createdAt: new Date(asset.createdAt).toJSON(),
    dataOfficeAdmin: getMaintainerByRoleName('data office admin')(maintainers),
    dataSteward: getMaintainerByRoleName('data steward')(maintainers),
    description: toPlainText(asset.description ?? []),
    excerpt: toPlainText(asset.excerpt ?? []),
    id: asset.id,
    name: asset.name,
    objectID: asset.id,
    owner: getMaintainerByRoleName('owner')(maintainers),
    provider: 'Collibra',
    qualityScore: 0,
    tags: asset.tags?.map((tag) => tag.label) ?? [],
    type: asset.type.name,
    updatedAt: new Date(asset.updatedAt).toJSON(),
    updateFrequency: toPlainText(asset.updateFrequency ?? []),
  })
