//import * as E from 'fp-ts/lib/Either'
//import * as TE from 'fp-ts/lib/TaskEither'
// import { pipe } from 'fp-ts/lib/function'

// @TOOO Get from models
import type { CollibraAsset } from '../../common/types'

export const mockData: CollibraAsset[] = [
  {
    objectID: 'be3a48195ff1f_dashboard_generated_id',
    createdAt: '2022-08-12T07:41:18.181Z',
    excerpt: 'A test data set',
    description: 'This data contains some test data',
    id: 'af6f7548-124c-4cf5-9ca5-aa216a60a53d',
    name: 'Test data',
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
]

//type FetchDataType = () => TE.TaskEither<Error, CollibraAsset[]>

//const fetch: FetchDataType = TE.of(mockData)

//export const fetchData = fetch()

export const fetchData = () => mockData
