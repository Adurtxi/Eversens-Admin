import { useFormik } from "formik"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import * as Yup from 'yup'
import TextFieldDialog from "@/common/components/dialog/TextFieldDialog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { putUser } from "@/services/user/user.service"
import { User } from "@/interfaces/backend/user"

interface EditUserDialogProps {
  open: boolean
  handleClose: () => void,
  user: User
}

export const EditUserDialog = ({ open, handleClose, user }: EditUserDialogProps) => {
  const { t } = useTranslation()

  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: putUser,
    onSuccess: () => {
      handleClose()
      queryClient.invalidateQueries({ queryKey: ['getUsers'] })
    }
  })
  
  const formik = useFormik({
    initialValues: {
      username: user.username,
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, t('users.edit_user_dialog.name_min_length'))
        .max(255)
        .required(t('users.edit_user_dialog.name_required')),
    }),
    onSubmit: (event, helpers) => {
      try {
        mutation.mutateAsync({...user, ...event})
      } catch (err: any) {
        helpers.setStatus({ success: false })
        helpers.setErrors({ submit: err.message })
        helpers.setSubmitting(false)
      }
    },
  })

  useEffect(() => {
    open && formik.resetForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return <TextFieldDialog
    open={open}
    handleClose={handleClose}
    title={t('users.edit_user_dialog.edit_user')}
    formik={formik}
    fieldName="username"
    label={t('users.edit_user_dialog.name')}
    buttonText={t('users.edit_user_dialog.edit')}
  />
}
