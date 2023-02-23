import * as TE from 'fp-ts/lib/TaskEither'

// @TOOO Get from models
import type { CollibraAsset } from '../../common/types'

export const mockData: CollibraAsset[] = [
  {
    objectID: 'be3a48195f4431f_dashboard_generated_id',
    createdAt: '2022-08-12T07:41:18.181Z',
    excerpt: 'A test data set',
    description: 'This data contains some test data',
    id: 'af6f7548-124c-4cf5-9ca5-aa2sdkf16a60a53d',
    name: 'Test data with fp-ts',
    provider: 'Collibra',
    qualityScore: 0,
    tags: ['Demand', 'Capacity', 'Supply'],
    community: ['Test department'],
    type: 'Data Product',
    updatedAt: '2022-12-03T07:06:11.347Z',
    updateFrequency: 'Hourly',
    dataOfficeAdmin: ['Ola Nordmann', 'Kari Andersen'],
    dataSteward: ['Kari Andersen'],
    owner: ['Ola Nordmann'],
  },
  {
    objectID: 'be3a48195f5451f_dashboard_generated_id',
    createdAt: '2022-08-12T07:41:18.181Z',
    excerpt: 'A test data set',
    description: 'This data contains some test data',
    id: 'af6f7548-124c-4cf5-9ca5-aa216a60dsd53d',
    name: 'Test data with fp-ts come on',
    provider: 'PowerBI',
    qualityScore: 0,
    tags: ['Demand', 'Capacity', 'Supply'],
    community: ['Test department'],
    type: 'Data Product',
    updatedAt: '2022-12-03T07:06:11.347Z',
    updateFrequency: 'Hourly',
    dataOfficeAdmin: ['Ola Nordmann', 'Kari Andersen'],
    dataSteward: ['Kari Andersen'],
    owner: ['Ola Nordmann'],
  },
  {
    objectID: 'be3a48195f5451f_233312',
    createdAt: '2022-08-12T07:41:18.181Z',
    excerpt: 'Hello world',
    description: 'This data is just a test',
    id: 'af6f7548-124c-4cf5-9ca5-aa216a434234ss',
    name: 'Hello world from Postman',
    provider: 'Collibra',
    qualityScore: 0,
    tags: ['Renewable'],
    community: ['Test department'],
    type: 'Data Product',
    updatedAt: '2022-12-03T07:06:11.347Z',
    updateFrequency: 'Hourly',
    dataOfficeAdmin: ['Ola Nordmann', 'Kari Andersen'],
    dataSteward: ['Kari Andersen'],
    owner: ['Ola Nordmann'],
  },
]

type FetchDataType = () => TE.TaskEither<Error, CollibraAsset[]>

export const fetch: TE.TaskEither<Error, CollibraAsset[]> = TE.of(mockData)
export const fetchData: FetchDataType = () => fetch
