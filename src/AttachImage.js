import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AttachFileIcon from "@material-ui/icons/AttachFile";

function AttachIamge() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const ChooseImage = () => {
    document.getElementById("imageFile").click();
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <AttachFileIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          Image
          <input
            onClick={ChooseImage}
            className="image__input"
            name="files[]"
            type="file"
            id="imageFile"
            accept="image/*"
          />
        </MenuItem>
        <MenuItem onClick={handleClose}>Document</MenuItem>
        <MenuItem onClick={handleClose}>Camera</MenuItem>
      </Menu>
    </div>
  );
}

export default AttachIamge;