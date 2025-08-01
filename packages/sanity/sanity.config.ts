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
        'newPosts',
        'storeList'
      ];
      if (type === 'global') {
        return prev.filter((template) => !DISABLED_TYPES.includes(template.templateId));
      }
      return prev;
    },
    
    // Prevent deletion of certain document types
    actions: (prev, { schemaType }) => {
      const PROTECTED_TYPES = ['about', 'newPosts', 'storeList', 'release'];
      
      if (PROTECTED_TYPES.includes(schemaType)) {
        // Remove the delete action for protected document types
        return prev.filter(action => action.action !== 'delete');
      }
      
      return prev;
    },
  },

  schema: {
    types: schemaTypes,
  },
})
