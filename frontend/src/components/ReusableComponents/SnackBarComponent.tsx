import {
  Snackbar,
  SnackbarContent,
  type SnackbarCloseReason,
} from "@mui/material";

interface SnackBarComponentProps {
  openState: boolean;
  closefunction: (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => void;
  message: string;
}

const SnackBarComponent: React.FC<SnackBarComponentProps> = ({
  openState,
  closefunction,
  message,
}) => {
  return (
    <Snackbar open={openState} autoHideDuration={2000} onClose={closefunction}>
      <SnackbarContent
        message={message}
        sx={{
          backgroundColor: "#fff",
          color: "#000",
        }}
      />
    </Snackbar>
  );
};
export default SnackBarComponent;
