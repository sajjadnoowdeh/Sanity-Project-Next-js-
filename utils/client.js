import clientSanity from '@sanity/client'
import config from './config'

const client = clientSanity({
    projectId:config.projectId,
    dataset:config.dataset,
    useCdn:true
})

export default client