import { Box, styled } from "@mui/material";
import { IconFilter } from "@tabler/icons-react";

const StyledGridOverlay = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%'
}));

export default function CustomNoFilterRowsOverlay() {
  return (
    <StyledGridOverlay>
      <IconFilter size={64} />
      <Box sx={{ mt: 1 }}>No Filter Rows</Box>
    </StyledGridOverlay>
  );
}