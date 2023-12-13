import { Box, styled } from "@mui/material";
import { IconDatabase } from "@tabler/icons-react";

const StyledGridOverlay = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%'
}));

export default function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <IconDatabase size={64} />
      <Box sx={{ mt: 1 }}>No Rows</Box>
    </StyledGridOverlay>
  );
}