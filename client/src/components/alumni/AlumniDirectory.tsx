
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Search, Filter, MessageCircle, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';
import { userService } from '@/services/api';

interface Alumni {
  _id: string;
  name: string;
  email: string;
  role: string;
  batch?: string;
  passingYear?: string;
  branch?: string;
  program?: string;
  bio?: string;
}

const AlumniDirectory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [selectedProgram, setSelectedProgram] = useState('All Programs');
  const [selectedBatch, setSelectedBatch] = useState('All Batches');
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [branches, setBranches] = useState<string[]>(['All Branches']);
  const [programs, setPrograms] = useState<string[]>(['All Programs']);
  const [batches, setBatches] = useState<string[]>(['All Batches']);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        setLoading(true);
        const data = await userService.getAlumni();
        setAlumni(data);
        
        // Extract unique branches, programs, and batches for filters
        const uniqueBranches = [...new Set(data.map((a: Alumni) => a.branch).filter(Boolean))] as string[];
        const uniquePrograms = [...new Set(data.map((a: Alumni) => a.program).filter(Boolean))] as string[];
        const uniqueBatches = [...new Set(data.map((a: Alumni) => a.batch).filter(Boolean))] as string[];
        
        setBranches(['All Branches', ...uniqueBranches]);
        setPrograms(['All Programs', ...uniquePrograms]);
        setBatches(['All Batches', ...uniqueBatches]);
      } catch (err) {
        setError('Failed to fetch alumni data');
        console.error('Error fetching alumni:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, []);

  // Filter alumni based on search term and filters
  const filteredAlumni = alumni.filter(alum => {
    const matchesSearch = alum.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = selectedBranch === 'All Branches' || alum.branch === selectedBranch;
    const matchesProgram = selectedProgram === 'All Programs' || alum.program === selectedProgram;
    const matchesBatch = selectedBatch === 'All Batches' || alum.batch === selectedBatch;

    return matchesSearch && matchesBranch && matchesProgram && matchesBatch;
  });

  const handleChatClick = (alum: Alumni) => {
    console.log('Navigating to chat with alumni:', alum);
    navigate(`/chat/${alum._id}`, { 
      state: { 
        participantName: alum.name, 
        participantId: alum._id 
      } 
    });
  };

  // ... keep existing code (loading, error, and return JSX)
  if (loading) {
    return (
      <Card className="p-6">
        <div className="text-center">Loading alumni directory...</div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-500">{error}</div>
      </Card>
    );
  }

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
            {filteredAlumni.map((alum) => (
              <TableRow key={alum._id}>
                <TableCell className="font-medium">{alum.name}</TableCell>
                <TableCell>{alum.program || 'N/A'}</TableCell>
                <TableCell>{alum.branch || 'N/A'}</TableCell>
                <TableCell>{alum.batch || 'N/A'}</TableCell>
                <TableCell>{alum.email}</TableCell>
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
                          <DialogTitle>{alum.name}'s Profile</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6 mt-4">
                          <div className="flex flex-col items-center justify-center">
                            <div className="relative w-24 h-24 rounded-full bg-brand-navy flex items-center justify-center mb-4">
                              <span className="text-4xl text-white font-bold">{alum.name.charAt(0)}</span>
                            </div>
                            <h2 className="text-xl font-bold">{alum.name}</h2>
                            <p className="text-gray-500">{alum.program} - {alum.branch}</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p><strong>Batch:</strong> {alum.batch || 'N/A'}</p>
                              <p><strong>Year of Passing:</strong> {alum.passingYear || 'N/A'}</p>
                              <p><strong>Email:</strong> {alum.email}</p>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold mb-2">Bio</h3>
                            <div className="p-4 bg-gray-50 rounded-lg">
                              <p className="text-gray-700">{alum.bio || 'No bio available'}</p>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleChatClick(alum)}
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
