import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';
import deskStructure from './deskStructure';

const SINGLETON_TYPES = ['about', 'newPosts'];

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

            if (type === 'global') {
                return prev.filter((template) => !SINGLETON_TYPES.includes(template.templateId));
            }
            return prev;
        },

        // Prevent deletion, duplication, and unpublishing of certain document types
        actions: (prev, { schemaType }) => {
            if (SINGLETON_TYPES.includes(schemaType)) {
                // Remove the delete, duplicate, and unpublish actions for protected document types
                return prev.filter(
                    (action) =>
                        action.action !== 'delete' &&
                        action.action !== 'duplicate' &&
                        action.action !== 'unpublish'
                );
            }

            return prev;
        },
    },

    schema: {
        types: schemaTypes,
    },
});
