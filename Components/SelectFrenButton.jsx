import { Avatar, IconButton } from "@mui/material";

function SelectFrenButton({ src, sx, children, onClick }) {
  return (
    <IconButton color="success" onClick={onClick}>
      <Avatar src={src} sx={sx}>
        {children}
      </Avatar>
    </IconButton>
  );
}

export default SelectFrenButton;
