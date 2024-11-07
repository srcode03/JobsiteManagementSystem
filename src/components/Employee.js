import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const Employee = () => {
  const [workers, setWorkers] = useState([
    {
      id: 1,
      name: 'John Doe',
      role: 'Foreman',
      department: 'Operations',
      contact: '555-0101',
      status: 'On Site',
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Electrician',
      department: 'Maintenance',
      contact: '555-0102',
      status: 'On Site',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'Carpenter',
      department: 'Construction',
      contact: '555-0103',
      status: 'Off Site',
    },
  ]);

  const [newWorker, setNewWorker] = useState({
    name: '',
    role: '',
    department: '',
    contact: '',
    status: 'On Site',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorker((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addWorker = () => {
    if (newWorker.name && newWorker.role && newWorker.contact && newWorker.department) {
      setWorkers((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          ...newWorker,
        },
      ]);
      setNewWorker({
        name: '',
        role: '',
        department: '',
        contact: '',
        status: 'On Site',
      });
    }
  };

  const removeWorker = (id) => {
    setWorkers((prev) => prev.filter((worker) => worker.id !== id));
  };

  const toggleStatus = (id) => {
    setWorkers((prev) =>
      prev.map((worker) =>
        worker.id === id
          ? { ...worker, status: worker.status === 'On Site' ? 'Off Site' : 'On Site' }
          : worker
      )
    );
  };

  return (
    <Card sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <CardHeader title="Construction Site Employee Management" />
      <CardContent>
        <div style={{ marginBottom: '1.5rem' }}>
          {/* Add New Worker Form */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <TextField
              fullWidth
              label="Worker Name"
              name="name"
              value={newWorker.name}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Role"
              name="role"
              value={newWorker.role}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Department"
              name="department"
              value={newWorker.department}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Contact Number"
              name="contact"
              value={newWorker.contact}
              onChange={handleInputChange}
              variant="outlined"
            />
            <Select
              fullWidth
              name="status"
              value={newWorker.status}
              onChange={handleInputChange}
              variant="outlined"
            >
              <MenuItem value="On Site">On Site</MenuItem>
              <MenuItem value="Off Site">Off Site</MenuItem>
            </Select>
            <Button variant="contained" color="primary" startIcon={<Add />} onClick={addWorker}>
              Add Worker
            </Button>
          </div>
        </div>

        {/* Workers Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workers.map((worker) => (
                <TableRow key={worker.id}>
                  <TableCell>{worker.id}</TableCell>
                  <TableCell>{worker.name}</TableCell>
                  <TableCell>{worker.role}</TableCell>
                  <TableCell>{worker.department}</TableCell>
                  <TableCell>{worker.contact}</TableCell>
                  <TableCell
                    onClick={() => toggleStatus(worker.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        backgroundColor: worker.status === 'On Site' ? 'green' : 'red',
                        color: 'white',
                        borderRadius: 1,
                        p: 0.5,
                        textAlign: 'center',
                      }}
                    >
                      {worker.status}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => removeWorker(worker.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default Employee;
