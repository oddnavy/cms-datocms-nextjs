import { map, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { ContentBlock, ContentMediaBlock } from '@inlight-media/react-components';

const contentBlocksMap = {
  text_block: ContentBlock,
  image_text_block: ContentMediaBlock,
};

const Placeholder = () => <div>Coming soon!</div>;

const ContentBlocks = ({ blocks }) => {
  if (isEmpty(blocks)) {
    return null;
  }

  return (
    <>
      {map(blocks, (block) => {
        let Block = contentBlocksMap[block.type];

        if (!Block) {
          Block = Placeholder;
        }
        return <Block key={block.id} {...block} />;
      })}
    </>
  );
};

ContentBlocks.propTypes = {
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ),
};

ContentBlocks.defaultProps = {
  blocks: [],
};

export { ContentBlocks };
