import { Box, Text } from '@inlight-media/react-components';

const Layout = ({ preview, children }) => {
  console.log(preview);

  return (
    <>
      {preview ? (
        <Box textAlign="center">
          <Text variant="sm" bg="gray.200" color="gray.900" py="2">
            This is page is showing draft content. <a href="/api/exit-preview">Click here</a> to exit preview mode.
          </Text>
        </Box>
      ) : null}
      <main>{children}</main>
    </>
  );
};

export { Layout };
