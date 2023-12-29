import { useState } from 'react'

import { User } from '@/interfaces/backend/user'

interface UseDialogs {
  searchParams: Record<string, any> | any
  setSearchParams: React.Dispatch<React.SetStateAction<Record<string, any> | any>>
  createDialogOpen: boolean
  handleCreateDialogOpen: () => void
  handleCreateDialogClose: () => void
  editDialogOpen: boolean
  selectedUser: User | null
  handleEditClick: (user: User) => void
  handleEditDialogClose: () => void
}

export const useDialogs = (): UseDialogs => {
  const [searchParams, setSearchParams] = useState<Record<string, any> | any>({})

  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const handleCreateDialogOpen = () => setCreateDialogOpen(true)
  const handleCreateDialogClose = () => setCreateDialogOpen(false)

  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const handleEditClick = (user: User) => {
    setSelectedUser(user)
    setEditDialogOpen(true)
  }
  const handleEditDialogClose = () => {
    setSelectedUser(null)
    setEditDialogOpen(false)
  }

  return {
    searchParams,
    setSearchParams,
    createDialogOpen,
    handleCreateDialogOpen,
    handleCreateDialogClose,
    editDialogOpen,
    selectedUser,
    handleEditClick,
    handleEditDialogClose,
  }
}