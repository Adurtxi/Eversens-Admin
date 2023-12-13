import { useFormik } from "formik"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import * as Yup from 'yup'
import TextFieldDialog from "@/common/components/dialog/TextFieldDialog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postMedicine } from "@/services/medicine/medicine.service"
import { Medicine } from "@/interfaces/backend/medicine"

interface NewMedicineDialogProps {
  open: boolean
  handleClose: () => void
}

export const NewMedicineDialog = ({ open, handleClose }: NewMedicineDialogProps) => {
  const { t } = useTranslation()

  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: postMedicine,
    onSuccess: () => {
      handleClose()
      queryClient.invalidateQueries({ queryKey: ['getMedicines'] })
    }
  })
  
  const formik = useFormik({
    initialValues: {
      name: '',
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, t('medicines.new_medicine_dialog.name_min_length'))
        .max(255)
        .required(t('medicines.new_medicine_dialog.name_required')),
    }),
    onSubmit: (event, helpers) => {
      try {
        mutation.mutateAsync({ ...new Medicine(), name: event.name })
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
    title={t('medicines.new_medicine_dialog.new_medicine')}
    formik={formik}
    fieldName="name"
    label={t('medicines.new_medicine_dialog.name')}
    buttonText={t('medicines.new_medicine_dialog.add')}
  />
}
