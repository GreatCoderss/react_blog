import React from "react";
import { Dialog } from "@material-ui/core";

export default function DialogComponent({
  initialState,
  handleClose,
  dialogData,
}) {
  return (
    <Dialog open={initialState} onClose={handleClose}>
      {dialogData}
    </Dialog>
  );
}
