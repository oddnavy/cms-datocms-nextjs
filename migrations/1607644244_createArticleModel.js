'use strict';

module.exports = async (client) => {
  const createBaseBlock = async (config) => {
    const block = await client.itemTypes.create(config);

    const preHeadingField = await client.fields.create(block.id, {
      label: 'Pre-Heading',
      fieldType: 'string',
      apiKey: 'pre_heading',
      appearance: {
        addons: [],
        editor: 'single_line',
        parameters: {
          heading: false,
        },
      },
    });

    const headingField = await client.fields.create(block.id, {
      label: 'Heading',
      fieldType: 'string',
      apiKey: 'heading',
      appearance: {
        addons: [],
        editor: 'single_line',
        parameters: {
          heading: false,
        },
      },
    });

    const bodyField = await client.fields.create(block.id, {
      label: 'Body',
      fieldType: 'text',
      apiKey: 'body',
      validators: {},
      appearance: {
        addons: [],
        editor: 'wysiwyg',
        parameters: {
          toolbar: [
            'format',
            'bold',
            'italic',
            'strikethrough',
            'ordered_list',
            'unordered_list',
            'quote',
            'table',
            'link',
            'image',
            'show_source',
            'fullscreen',
          ],
        },
        type: 'wysiwyg',
      },
    });

    return block;
  };

  const createTextBlock = async (config) => {
    const textBlock = await createBaseBlock({
      name: 'aText Block',
      apiKey: 'atext_block',
      modularBlock: true,
    });

    const blockAlignmentField = await client.fields.create(textBlock.id, {
      label: 'Block Alignment',
      fieldType: 'string',
      defaultValue: 'left',
      apiKey: 'block_alignment',
      validators: {
        enum: {
          values: ['left', 'center'],
        },
      },
      appearance: {
        addons: [],
        editor: 'single_line',
        parameters: {
          heading: false,
        },
      },
      position: 4,
    });

    const textAlignmentField = await client.fields.create(textBlock.id, {
      label: 'Text Alignment',
      fieldType: 'string',
      defaultValue: 'left',
      apiKey: 'text_alignment',
      validators: {
        enum: {
          values: ['left', 'center'],
        },
      },
      appearance: {
        addons: [],
        editor: 'single_line',
        parameters: {
          heading: false,
        },
      },
      position: 5,
    });

    return textBlock;
  };

  const createImageTextBlock = async () => {
    const imageTextBlock = await createBaseBlock({
      name: 'aImage Text Block',
      apiKey: 'aimage_text_block',
      modularBlock: true,
    });

    const imageField = await client.fields.create(imageTextBlock.id, {
      label: 'Image',
      fieldType: 'file',
      apiKey: 'image',
      validators: {
        required: {},
      },
    });

    const mediaPositionField = await client.fields.create(imageTextBlock.id, {
      label: 'Media Position',
      fieldType: 'string',
      defaultValue: 'left',
      apiKey: 'media_position',
      validators: {
        enum: {
          values: ['left', 'right'],
        },
      },
      appearance: {
        addons: [],
        editor: 'single_line',
        parameters: {
          heading: false,
        },
      },
    });

    const variantField = await client.fields.create(imageTextBlock.id, {
      label: 'Variant',
      fieldType: 'string',
      defaultValue: 'light',
      apiKey: 'variant',
      validators: {
        enum: {
          values: ['light', 'dark'],
        },
      },
      appearance: {
        addons: [],
        editor: 'single_line',
        parameters: {
          heading: false,
        },
      },
    });

    return imageTextBlock;
  };

  // DatoCMS migration script

  // For more examples, head to our Content Management API docs:
  // https://www.datocms.com/docs/content-management-api

  // Create an Article model:
  // https://www.datocms.com/docs/content-management-api/resources/item-type/create

  const articleModel = await client.itemTypes.create({
    name: 'Article',
    apiKey: 'article',
  });

  // Create a Title field (required):
  // https://www.datocms.com/docs/content-management-api/resources/field/create

  const titleField = await client.fields.create(articleModel.id, {
    label: 'Title',
    apiKey: 'title',
    fieldType: 'string',
    validators: {
      required: {},
    },
    appearance: {
      editor: 'single_line',
      parameters: {
        heading: true,
      },
      addons: [],
    },
    position: 1,
  });

  const slugField = await client.fields.create(articleModel.id, {
    label: 'Slug',
    fieldType: 'slug',
    apiKey: 'slug',
    validators: {
      unique: {},
      required: {},
      slugFormat: {
        predefinedPattern: 'webpage_slug',
      },
      slugTitleField: {
        titleFieldId: titleField.id,
      },
    },
    appearance: {
      addons: [],
      editor: 'slug',
      parameters: {
        urlPrefix: 'https://www.example.com',
      },
    },
    position: 2,
  });

  const metaField = await client.fields.create(articleModel.id, {
    label: 'Meta Tags',
    fieldType: 'seo',
    apiKey: 'meta_tags',
    validators: {
      titleLength: {
        max: 160,
      },
      descriptionLength: {
        max: 320,
      },
    },
    position: 3,
  });

  const textBlock = await createTextBlock(client);

  const ImageTextBlock = await createImageTextBlock(client);

  const contentBlocksField = await client.fields.create(articleModel.id, {
    label: 'Content Blocks',
    fieldType: 'rich_text',
    apiKey: 'content_blocks',
    validators: {
      richTextBlocks: {
        itemTypes: [textBlock.id, ImageTextBlock.id],
      },
    },
    position: 4,
  });

  // Create an Article record:
  // https://www.datocms.com/docs/content-management-api/resources/item/create

  // const article = await client.items.create({
  //   itemType: articleModel.id,
  //   title: 'My first article!',
  //   slug: 'my-first-article',
  //   contentBlocks: [],
  // });
};
