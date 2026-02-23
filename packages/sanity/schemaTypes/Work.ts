import { MdWork } from 'react-icons/md';

export default {
    title: 'Collection',
    name: 'work',
    type: 'document',
    icon: MdWork,
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            title: 'Artist',
            name: 'artist',
            type: 'string',
        },
        {
            title: 'Intro',
            name: 'intro',
            type: 'text',
            rows: 4,
        },
        {
            title: 'Year Start',
            name: 'yearStart',
            type: 'number',
            validation: (Rule: any) => Rule.required().integer().min(1900).max(2100),
        },
        {
            title: 'Year End',
            name: 'yearEnd',
            type: 'number',
            validation: (Rule: any) => Rule.integer().min(1900).max(2100),
        },
        {
            title: 'Tags',
            name: 'tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
        },
        {
            title: 'Credits',
            name: 'credits',
            type: 'text',
            rows: 6,
        },
        {
            title: 'Default View',
            name: 'defaultView',
            type: 'string',
            options: {
                list: [
                    { title: 'Image', value: 'image' },
                    { title: 'Text', value: 'text' },
                    { title: 'Grid', value: 'grid' },
                ],
                layout: 'radio',
                direction: 'horizontal',
            },
            initialValue: 'image',
        },
        {
            title: 'Media',
            name: 'media',
            type: 'array',
            of: [
                {
                    title: 'Image',
                    name: 'imageMedia',
                    type: 'object',
                    fields: [
                        {
                            title: 'Image',
                            name: 'image',
                            type: 'image',
                            options: {
                                hotspot: true,
                            },
                            validation: (Rule: any) => Rule.required(),
                        },
                        {
                            title: 'Caption',
                            name: 'caption',
                            type: 'string',
                        },
                        {
                            title: 'Credits',
                            name: 'credits',
                            type: 'text',
                            rows: 3,
                        },
                        {
                            title: 'Year',
                            name: 'year',
                            type: 'number',
                            validation: (Rule: any) => Rule.integer().min(1900).max(2100),
                        },
                    ],
                    preview: {
                        select: {
                            media: 'image',
                            caption: 'caption',
                        },
                        prepare(value: Record<string, any>) {
                            return {
                                title: value.caption || 'Image',
                                media: value.media,
                            };
                        },
                    },
                },
                {
                    title: 'Audio',
                    name: 'audioMedia',
                    type: 'object',
                    fields: [
                        {
                            title: 'Audio File',
                            name: 'file',
                            type: 'file',
                            options: {
                                accept: 'audio/*',
                            },
                            validation: (Rule: any) => Rule.required(),
                        },
                        {
                            title: 'Caption',
                            name: 'caption',
                            type: 'string',
                        },
                        {
                            title: 'Credits',
                            name: 'credits',
                            type: 'text',
                            rows: 3,
                        },
                        {
                            title: 'Year',
                            name: 'year',
                            type: 'number',
                            validation: (Rule: any) => Rule.integer().min(1900).max(2100),
                        },
                    ],
                    preview: {
                        select: {
                            caption: 'caption',
                        },
                        prepare(value: Record<string, any>) {
                            return {
                                title: value.caption || 'Audio',
                            };
                        },
                    },
                },
                {
                    title: 'Video',
                    name: 'videoMedia',
                    type: 'object',
                    fields: [
                        {
                            title: 'Video File',
                            name: 'file',
                            type: 'file',
                            options: {
                                accept: 'video/*',
                            },
                            validation: (Rule: any) => Rule.required(),
                        },
                        {
                            title: 'Caption',
                            name: 'caption',
                            type: 'string',
                        },
                        {
                            title: 'Credits',
                            name: 'credits',
                            type: 'text',
                            rows: 3,
                        },
                        {
                            title: 'Year',
                            name: 'year',
                            type: 'number',
                            validation: (Rule: any) => Rule.integer().min(1900).max(2100),
                        },
                    ],
                    preview: {
                        select: {
                            caption: 'caption',
                        },
                        prepare(value: Record<string, any>) {
                            return {
                                title: value.caption || 'Video',
                            };
                        },
                    },
                },
            ],
        },
    ],
    preview: {
        select: {
            title: 'title',
            artist: 'artist',
            yearStart: 'yearStart',
            yearEnd: 'yearEnd',
        },
        prepare(value: Record<string, any>) {
            const { title, artist, yearStart, yearEnd } = value;
            const yearDisplay = yearEnd ? `${yearStart}–${yearEnd}` : `${yearStart}`;
            const subtitle = artist ? `${artist} (${yearDisplay})` : yearDisplay;
            return {
                title,
                subtitle,
            };
        },
    },
};
