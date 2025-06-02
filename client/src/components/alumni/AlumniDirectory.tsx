
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Search, Filter, MessageCircle, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';


// Mock data for alumni with bio field
const mockAlumni = [
  { 
    id: 1, 
    name: 'Alex Johnson', 
    branch: 'Computer Science', 
    program: 'BE', 
    batch: '2019-2023', 
    passingYear: 2023, 
    email: 'alex.j@example.com',
    bio: 'Full-stack developer at Microsoft with expertise in cloud technologies and AI. Passionate about mentoring students in software development.'
  },
  { 
    id: 2, 
    name: 'Maya Patel', 
    branch: 'Electrical Engineering', 
    program: 'MTech', 
    batch: '2018-2022', 
    passingYear: 2022, 
    email: 'maya.p@example.com',
    bio: 'Senior Engineer at Tesla working on battery management systems. Enthusiastic about sustainable technology and innovation in electric vehicles.'
  },
  { 
    id: 3, 
    name: 'Thomas Chen', 
    branch: 'Mechanical Engineering', 
    program: 'PhD', 
    batch: '2017-2021', 
    passingYear: 2021, 
    email: 't.chen@example.com',
    bio: 'Research scientist at NASA JPL specializing in robotics and space exploration. Always excited to share knowledge about aerospace engineering.'
  },
  { 
    id: 4, 
    name: 'Sarah Wilson', 
    branch: 'Computer Science', 
    program: 'BE', 
    batch: '2019-2023', 
    passingYear: 2023, 
    email: 'sarah.w@example.com',
    bio: 'Product Manager at Google focusing on machine learning products. Love helping students understand the intersection of technology and business.'
  },
  { 
    id: 5, 
    name: 'James Rodriguez', 
    branch: 'Civil Engineering', 
    program: 'MTech', 
    batch: '2016-2020', 
    passingYear: 2020, 
    email: 'j.rodriguez@example.com',
    bio: 'Structural engineer at Bechtel Corporation working on large-scale infrastructure projects. Passionate about sustainable construction practices.'
  },
];

const branches = ['All Branches', 'Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering'];
const programs = ['All Programs', 'BE', 'MTech', 'PhD'];
const batches = ['All Batches', '2016-2020', '2017-2021', '2018-2022', '2019-2023'];

const AlumniDirectory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [selectedProgram, setSelectedProgram] = useState('All Programs');
  const [selectedBatch, setSelectedBatch] = useState('All Batches');

  // Filter alumni based on search term and filters
  const filteredAlumni = mockAlumni.filter(alumni => {
    const matchesSearch = alumni.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = selectedBranch === 'All Branches' || alumni.branch === selectedBranch;
    const matchesProgram = selectedProgram === 'All Programs' || alumni.program === selectedProgram;
    const matchesBatch = selectedBatch === 'All Batches' || alumni.batch === selectedBatch;

    return matchesSearch && matchesBranch && matchesProgram && matchesBatch;
  });

  const handleChatClick = (alumni) => {
    navigate('/chat', { state: { alumniName: alumni.name, alumniId: alumni.id } });
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <Input 
            placeholder="Search alumni by name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center gap-2">
            <Filter className="text-gray-500" />
            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Branch" />
              </SelectTrigger>
              <SelectContent>
                {branches.map((branch) => (
                  <SelectItem key={branch} value={branch}>
                    {branch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-gray-500" />
            <Select value={selectedProgram} onValueChange={setSelectedProgram}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Program" />
              </SelectTrigger>
              <SelectContent>
                {programs.map((program) => (
                  <SelectItem key={program} value={program}>
                    {program}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-gray-500" />
            <Select value={selectedBatch} onValueChange={setSelectedBatch}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Batch" />
              </SelectTrigger>
              <SelectContent>
                {batches.map((batch) => (
                  <SelectItem key={batch} value={batch}>
                    {batch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Batch</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAlumni.map((alumni) => (
              <TableRow key={alumni.id}>
                <TableCell className="font-medium">{alumni.name}</TableCell>
                <TableCell>{alumni.program}</TableCell>
                <TableCell>{alumni.branch}</TableCell>
                <TableCell>{alumni.batch}</TableCell>
                <TableCell>{alumni.email}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <User className="h-4 w-4 mr-2" /> Profile
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{alumni.name}'s Profile</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6 mt-4">
                          <div className="flex flex-col items-center justify-center">
                            <div className="relative w-24 h-24 rounded-full bg-brand-navy flex items-center justify-center mb-4">
                              <span className="text-4xl text-white font-bold">{alumni.name.charAt(0)}</span>
                            </div>
                            <h2 className="text-xl font-bold">{alumni.name}</h2>
                            <p className="text-gray-500">{alumni.program} - {alumni.branch}</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p><strong>Batch:</strong> {alumni.batch}</p>
                              <p><strong>Year of Passing:</strong> {alumni.passingYear}</p>
                              <p><strong>Email:</strong> {alumni.email}</p>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold mb-2">Bio</h3>
                            <div className="p-4 bg-gray-50 rounded-lg">
                              <p className="text-gray-700">{alumni.bio}</p>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleChatClick(alumni)}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" /> Message
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredAlumni.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No alumni found matching your criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default AlumniDirectory;
