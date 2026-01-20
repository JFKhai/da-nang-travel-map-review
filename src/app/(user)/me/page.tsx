'use client'

import { User, Heart, Settings } from 'lucide-react'
import UserDashboardLayout from './_components/user-dashboard-layout'
import EditProfileForm from './_components/edit-profile-form'
import ChangePasswordForm from './_components/change-password-form'
import FavoritesList from './_components/favorites-list'

export default function MePage() {
  const tabs = [
    {
      id: 'profile',
      label: 'Thông tin cá nhân',
      icon: User,
      content: (
        <div className="space-y-8">
          <EditProfileForm />
          <div className="border-t border-gray-200 pt-8">
            <ChangePasswordForm />
          </div>
        </div>
      ),
    },
    {
      id: 'favorites',
      label: 'Yêu thích',
      icon: Heart,
      content: <FavoritesList />,
    },
    {
      id: 'settings',
      label: 'Cài đặt',
      icon: Settings,
      content: (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Cài đặt</h3>
          <p className="text-gray-500">Các tùy chọn cài đặt sẽ được cập nhật sau.</p>
        </div>
      ),
    },
  ]

  return <UserDashboardLayout tabs={tabs} defaultTab="profile" />
}
