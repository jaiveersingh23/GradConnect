
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { User, Edit, Save, X } from 'lucide-react';
import { toast } from 'sonner';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || ''
  });

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || ''
    });
    setIsEditing(false);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 container">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Profile</h1>
            <p className="text-muted-foreground">
              Manage your profile information and bio
            </p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-brand-navy flex items-center justify-center text-white text-xl font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <CardTitle className="text-xl">{user.name}</CardTitle>
                </div>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={handleSave} size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button onClick={handleCancel} variant="outline" size="sm">
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  ) : (
                    <p className="mt-1 p-2 bg-gray-50 rounded">{user.name}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  ) : (
                    <p className="mt-1 p-2 bg-gray-50 rounded">{user.email}</p>
                  )}
                </div>
                <div>
                  <Label>Role</Label>
                  <p className="mt-1 p-2 bg-gray-50 rounded capitalize">{user.role}</p>
                </div>
                {user.usn && (
                  <div>
                    <Label>USN</Label>
                    <p className="mt-1 p-2 bg-gray-50 rounded">{user.usn}</p>
                  </div>
                )}
                {user.branch && (
                  <div>
                    <Label>Branch</Label>
                    <p className="mt-1 p-2 bg-gray-50 rounded">{user.branch}</p>
                  </div>
                )}
                {user.program && (
                  <div>
                    <Label>Program</Label>
                    <p className="mt-1 p-2 bg-gray-50 rounded">{user.program}</p>
                  </div>
                )}
                {user.batch && (
                  <div>
                    <Label>Batch</Label>
                    <p className="mt-1 p-2 bg-gray-50 rounded">{user.batch}</p>
                  </div>
                )}
                {user.passingYear && (
                  <div>
                    <Label>Passing Year</Label>
                    <p className="mt-1 p-2 bg-gray-50 rounded">{user.passingYear}</p>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself, your work experience, and interests..."
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                    className="mt-1"
                  />
                ) : (
                  <div className="mt-1 p-3 bg-gray-50 rounded min-h-[100px]">
                    {user.bio || (
                      <span className="text-muted-foreground italic">
                        No bio added yet. Click "Edit Profile" to add your bio.
                      </span>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
