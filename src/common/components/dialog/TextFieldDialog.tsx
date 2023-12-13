import { Button, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { CustomDialog } from "./Dialog"

interface TextFieldDialogProps {
  open: boolean
  handleClose: () => void
  title: string
  formik: any,
  fieldName: string
  label: string
  buttonText: string
}

const TextFieldDialog: React.FC<TextFieldDialogProps> = ({ open, handleClose, title, formik, fieldName, label, buttonText }) => (
  <CustomDialog maxWidth='xs' fullWidth open={open} onClose={handleClose}>
    <DialogTitle>{title}</DialogTitle>
    <form noValidate onSubmit={formik.handleSubmit}>
      <DialogContent>
        <TextField
          error={!!(formik.touched[fieldName] && formik.errors[fieldName])}
          fullWidth
          helperText={formik.touched[fieldName] && formik.errors[fieldName]}
          label={label}
          name={fieldName}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          value={formik.values[fieldName]}
          size="small"
          autoComplete="off"
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="contained" fullWidth disabled={formik.values[fieldName] == '' || !formik.isValid}>
          {buttonText}
        </Button>
      </DialogActions>
    </form>
  </CustomDialog>
)

export default TextFieldDialog