import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'

interface LoginProps {
  onLogin: (username: string, password: string) => void
}

export default function LoginPage({ onLogin }: LoginProps): JSX.Element {
  const { t } = useTranslation()
  
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      submit: null,
    },
    validationSchema: Yup.object({
      username: Yup.string().max(255).required(t('login.username_required')),
      password: Yup.string().max(255).required(t('login.password_required')),
    }),
    onSubmit: async (event, helpers) => {
      try {
        onLogin(event.username, event.password)
      } catch (err: any) {
        helpers.setStatus({ success: false })
        helpers.setErrors({ submit: err.message })
        helpers.setSubmitting(false)
      }
    },
  })

  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <Card
        sx={{
          width: ['100%', '60%', '40%'],
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="h4" mt={5} textAlign='center'>
          {t('login.title')}
        </Typography>

        <Box
          sx={{
            px: 5,
            py: 5,
            width: '100%',
          }}
        >
          <form noValidate onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
              <TextField
                error={!!(formik.touched.username && formik.errors.username)}
                fullWidth
                helperText={formik.touched.username && formik.errors.username}
                label={t('login.username')}
                name="username"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.username}
              />
              <TextField
                error={!!(formik.touched.password && formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label={t('login.password')}
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
              />
            </Stack>
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
            >
              {t('login.button')}
            </Button>
          </form>
        </Box>
      </Card>
    </Container>
  )
}
