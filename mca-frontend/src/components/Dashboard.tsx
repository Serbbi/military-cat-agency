import { useState } from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { DeleteAccountDialog } from "@/components/blocks/dialog-07"

interface User {
  id: number
  email: string
  fullName: string | null
  createdAt: string
  updatedAt: string | null
}

interface DashboardProps {
  user: User
  onLogout: () => void
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await axios.post('http://localhost:63078/auth/logout', {}, {
        withCredentials: true,
      })
      onLogout()
    } catch (error) {
      console.error('Logout failed:', error)
      // Still logout locally even if server request fails
      onLogout()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-card shadow-lg rounded-lg p-8 border">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome, {user.fullName || user.email}!
            </h1>
            <p className="text-muted-foreground">
              You are successfully logged in to the Military Cat Agency.
            </p>
            <div className="mt-4">
              <DeleteAccountDialog
                email={user.email}
                onDelete={async (password) => {
                  await axios.post(
                    "http://localhost:53422/auth/delete-account",
                    { password },
                    { withCredentials: true }
                  );
                  onLogout();
                }}
              />
            </div>
          </div>
          <Button
            onClick={handleLogout}
            disabled={isLoading}
            variant="outline"
            className="text-destructive border-destructive hover:bg-destructive/10"
          >
            {isLoading ? 'Signing out...' : 'Sign out'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-muted rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Account Information</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-muted-foreground">Email</label>
                <p className="text-foreground">{user.email}</p>
              </div>
              {user.fullName && (
                <div>
                  <label className="block text-sm font-medium text-muted-foreground">Full Name</label>
                  <p className="text-foreground">{user.fullName}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-muted-foreground">Member Since</label>
                <p className="text-foreground">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-accent rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                View Profile
              </Button>
              <Button className="w-full justify-start" variant="outline">
                Update Settings
              </Button>
              <Button className="w-full justify-start" variant="outline">
                View Activity
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
          <h2 className="text-xl font-semibold text-foreground mb-2">Protected Route Test</h2>
          <p className="text-muted-foreground mb-4">
            This dashboard is only accessible to authenticated users. Your session is active and secure.
          </p>
          <Button
            onClick={async () => {
              try {
                const response = await axios.get('http://localhost:53422/protected', {
                  withCredentials: true,
                })
                alert('Protected route accessed successfully!')
                console.log('Protected route response:', response.data)
              } catch (error) {
                alert('Failed to access protected route')
                console.error('Protected route error:', error)
              }
            }}
            variant="outline"
          >
            Test Protected Route
          </Button>
        </div>
      </div>
    </div>
  )
} 