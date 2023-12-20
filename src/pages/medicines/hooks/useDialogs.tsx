import { useState } from 'react'

import { Medicine } from '@/interfaces/backend/medicine'

interface UseDialogs {
  searchParams: Record<string, any> | any
  setSearchParams: React.Dispatch<React.SetStateAction<Record<string, any> | any>>
  createDialogOpen: boolean
  handleCreateDialogOpen: () => void
  handleCreateDialogClose: () => void
  editDialogOpen: boolean
  selectedMedicine: Medicine | null
  handleEditClick: (medicine: Medicine) => void
  handleEditDialogClose: () => void
}

export const useDialogs = (): UseDialogs => {
  const [searchParams, setSearchParams] = useState<Record<string, any> | any>({})

  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const handleCreateDialogOpen = () => setCreateDialogOpen(true)
  const handleCreateDialogClose = () => setCreateDialogOpen(false)

  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null)

  const handleEditClick = (medicine: Medicine) => {
    setSelectedMedicine(medicine)
    setEditDialogOpen(true)
  }
  const handleEditDialogClose = () => {
    setSelectedMedicine(null)
    setEditDialogOpen(false)
  }

  return {
    searchParams,
    setSearchParams,
    createDialogOpen,
    handleCreateDialogOpen,
    handleCreateDialogClose,
    editDialogOpen,
    selectedMedicine,
    handleEditClick,
    handleEditDialogClose,
  }
}