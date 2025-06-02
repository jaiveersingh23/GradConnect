
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    usn: '', // For students
    batch: '', // For alumni
    passingYear: '', // For alumni
    branch: '', // For alumni only now
    program: 'BE', // BE, MTech, PhD
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate batch years (current year - 10 to current year + 4)
  const currentYear = new Date().getFullYear();
  const batchYears = Array.from({ length: 15 }, (_, i) => `${currentYear - 10 + i}-${currentYear - 10 + i + 4}`);
  
  // Generate passing years (current year - 10 to current year + 4)
  const passingYears = Array.from({ length: 15 }, (_, i) => `${currentYear - 10 + i}`);

  const branches = [
    'Computer Science',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electronics and Communication',
    'Information Technology',
    'Chemical Engineering'
  ];

  const programs = ['BE', 'MTech', 'PhD'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleBranchChange = (value: string) => {
    setFormData((prev) => ({ ...prev, branch: value }));
  };

  const handleBatchChange = (value: string) => {
    setFormData((prev) => ({ ...prev, batch: value }));
  };

  const handlePassingYearChange = (value: string) => {
    setFormData((prev) => ({ ...prev, passingYear: value }));
  };

  const handleProgramChange = (value: string) => {
    setFormData((prev) => ({ ...prev, program: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    
    // Additional validations
    if (formData.role === 'student' && !formData.usn) {
      toast.error("Please enter your USN");
      return;
    }

    if (formData.role === 'alumni' && (!formData.batch || !formData.passingYear || !formData.branch)) {
      toast.error("Please complete all alumni fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // This would be replaced with actual API call
    setTimeout(() => {
      toast.success('Registration successful! Please check your email to verify your account.');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Join GradConnect to connect with alumni and explore opportunities.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@university.edu"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label>I am a:</Label>
            <RadioGroup value={formData.role} onValueChange={handleRoleChange} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="student" />
                <Label htmlFor="student" className="cursor-pointer">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="alumni" id="alumni" />
                <Label htmlFor="alumni" className="cursor-pointer">Alumni</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Only show branch selection for alumni */}
          {formData.role === 'alumni' && (
            <div className="space-y-2">
              <Label htmlFor="branch">Branch</Label>
              <Select required value={formData.branch} onValueChange={handleBranchChange}>
                <SelectTrigger id="branch">
                  <SelectValue placeholder="Select your branch" />
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
          )}

          {/* Conditional fields based on role */}
          {formData.role === 'student' && (
            <div className="space-y-2">
              <Label htmlFor="usn">University Serial Number (USN)</Label>
              <Input
                id="usn"
                name="usn"
                placeholder="1XX20CSXXX"
                required
                value={formData.usn}
                onChange={handleChange}
              />
            </div>
          )}

          {formData.role === 'alumni' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="program">Program</Label>
                <Select required value={formData.program} onValueChange={handleProgramChange}>
                  <SelectTrigger id="program">
                    <SelectValue placeholder="Select your program" />
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
              <div className="space-y-2">
                <Label htmlFor="batch">Batch</Label>
                <Select required value={formData.batch} onValueChange={handleBatchChange}>
                  <SelectTrigger id="batch">
                    <SelectValue placeholder="Select your batch" />
                  </SelectTrigger>
                  <SelectContent>
                    {batchYears.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="passingYear">Passing Year</Label>
                <Select required value={formData.passingYear} onValueChange={handlePassingYearChange}>
                  <SelectTrigger id="passingYear">
                    <SelectValue placeholder="Select your passing year" />
                  </SelectTrigger>
                  <SelectContent>
                    {passingYears.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            type="submit" 
            className="w-full bg-brand-navy hover:bg-brand-navy/90" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </Button>
          <div className="text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-navy hover:underline font-medium">
              Login
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RegisterForm;
