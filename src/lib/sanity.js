import {createClient} from '@sanity/client'

export const sanityConfig = {
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID || 'fqck037q',
  dataset: process.env.REACT_APP_SANITY_DATASET || 'production',
  apiVersion: process.env.REACT_APP_SANITY_API_VERSION || '2025-01-01',
  useCdn: true,
}

export const sanityClient = createClient(sanityConfig)
