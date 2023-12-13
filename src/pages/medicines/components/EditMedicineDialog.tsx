import { useFormik } from "formik"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import * as Yup from 'yup'
import TextFieldDialog from "@/common/components/dialog/TextFieldDialog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { putMedicine } from "@/services/medicine/medicine.service"
import { Medicine } from "@/interfaces/backend/medicine"

interface EditMedicineDialogProps {
  open: boolean
  handleClose: () => void,
  medicine: Medicine
}

export const EditMedicineDialog = ({ open, handleClose, medicine }: EditMedicineDialogProps) => {
  const { t } = useTranslation()

  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: putMedicine,
    onSuccess: () => {
      handleClose()
      queryClient.invalidateQueries({ queryKey: ['getMedicines'] })
    }
  })
  
  const formik = useFormik({
    initialValues: {
      name: medicine.name,
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, t('medicines.edit_medicine_dialog.name_min_length'))
        .max(255)
        .required(t('medicines.edit_medicine_dialog.name_required')),
    }),
    onSubmit: (event, helpers) => {
      try {
        mutation.mutateAsync({...medicine, ...event})
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
    title={t('medicines.edit_medicine_dialog.edit_medicine')}
    formik={formik}
    fieldName="name"
    label={t('medicines.edit_medicine_dialog.name')}
    buttonText={t('medicines.edit_medicine_dialog.edit')}
  />
}
