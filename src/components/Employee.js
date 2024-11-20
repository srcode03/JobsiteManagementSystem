import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [workers, setWorkers] = useState([]); // Initialize workers as an array
  const [newWorker, setNewWorker] = useState({
    name: '',
    role: '',
    department: '',
    contact: '',
    status: 'On Site',
  });

  // Fetch workers from the backend API
  useEffect(() => {
    axios
      .get("http://localhost:8000/workers")
      .then((response) => {
        if (response.data.success) {
          const formattedWorkers = response.data.employees.map((worker) => ({
            ...worker,
            id: worker._id, // Use the stringified _id as the unique ID
          }));
          setWorkers(formattedWorkers);
        } else {
          console.error("Failed to fetch workers:", response.data.error);
        }
      })
      .catch((error) => console.error("Error fetching workers:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorker((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addWorker = () => {
    if (newWorker.name && newWorker.role && newWorker.contact && newWorker.department) {
      axios
        .post("http://localhost:8000/workers", newWorker)
        .then((response) => {
          if (response.data.success) {
            // Temporarily add the worker to the local state
            setWorkers((prev) => [
              ...prev,
              { ...newWorker, id: Date.now().toString() }, // Generate a temp ID
            ]);
            setNewWorker({
              name: "",
              role: "",
              department: "",
              contact: "",
              status: "On Site",
            });
          } else {
            console.error("Failed to add worker:", response.data.msg);
          }
        })
        .catch((error) => console.error("Error adding worker:", error));
    }
  };

  const removeWorker = (id) => {
    axios
      .delete(`http://localhost:8000/workers/${id}`)
      .then(() => {
        setWorkers((prev) => prev.filter((worker) => worker.id !== id));
      })
      .catch((error) => console.error('Error deleting worker:', error));
  };

  const toggleStatus = (id) => {
    const updatedWorkers = workers.map((worker) =>
      worker.id === id
        ? { ...worker, status: worker.status === 'On Site' ? 'Off Site' : 'On Site' }
        : worker
    );
    setWorkers(updatedWorkers);

    // Optional: Send the updated status to the backend
    const updatedWorker = updatedWorkers.find((worker) => worker.id === id);
    if (updatedWorker) {
      axios
        .put(`http://localhost:8000/workers/${id}`, updatedWorker)
        .catch((error) => console.error('Error updating worker status:', error));
    }
  };

  return (
    <Card sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <CardHeader title="Construction Site Employee Management" />
      <CardContent>
        <div style={{ marginBottom: '1.5rem' }}>
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
              {workers.length > 0 ? (
                workers.map((worker) => (
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7}>No workers found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default Employee;
