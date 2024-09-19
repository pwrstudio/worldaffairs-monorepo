import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'
import deskStructure from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'worldaffairs-admin',
  studioHost: 'worldaffairs-admin',

  projectId: 'fzoco9f8',
  dataset: 'production',

  plugins: [structureTool({ structure: deskStructure })],

  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      const { type } = creationContext;
      const DISABLED_TYPES = [
        'about',
      ];
      if (type === 'global') {
        return prev.filter((template) => !DISABLED_TYPES.includes(template.templateId));
      }
      return prev;
    },
  },

  schema: {
    types: schemaTypes,
  },
})
