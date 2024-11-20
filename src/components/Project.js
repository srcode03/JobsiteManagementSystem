import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  TextField,
  MenuItem,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    projectName: '',
    location: '',
    startDate: '',
    department: '',
    numberOfEmployees: '',
    budget: '',
    description: '',
  });

  // Fetch projects from the database on component load
  useEffect(() => {
    axios
      .get('http://localhost:8000/projects')
      .then((response) => setProjects(response.data.projects))
      .catch((error) => console.error('Error fetching projects:', error));
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit the new project to the database
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8000/projects', formData)
      .then((response) => {
        // Add the newly created project to the state
        setProjects((prev) => [...prev, { ...formData, id: response.data.id }]);
        setFormData({
          projectName: '',
          location: '',
          startDate: '',
          department: '',
          numberOfEmployees: '',
          budget: '',
          description: '',
        });
        setOpen(false);
      })
      .catch((error) => console.error('Error adding project:', error));
  };

  // Delete a project by ID
  const deleteProject = (id) => {
    axios
      .delete(`http://localhost:8000/projects/${id}`)
      .then(() => {
        setProjects((prev) => prev.filter((project) => project.id !== id));
      })
      .catch((error) => console.error('Error deleting project:', error));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Construction Project Management
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => setOpen(true)}
        sx={{ mb: 3 }}
      >
        Add New Project
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Project</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} style={{ marginTop: '16px' }}>
            <TextField
              fullWidth
              margin="dense"
              label="Project Name"
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              margin="dense"
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              margin="dense"
              label="Start Date"
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              margin="dense"
              select
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              required
            >
              <MenuItem value="">Select Department</MenuItem>
              <MenuItem value="Civil">Civil</MenuItem>
              <MenuItem value="Electrical">Electrical</MenuItem>
              <MenuItem value="Mechanical">Mechanical</MenuItem>
              <MenuItem value="Plumbing">Plumbing</MenuItem>
            </TextField>
            <TextField
              fullWidth
              margin="dense"
              label="Number of Employees"
              name="numberOfEmployees"
              type="number"
              value={formData.numberOfEmployees}
              onChange={handleInputChange}
              required
              InputProps={{ inputProps: { min: 1 } }}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Budget"
              name="budget"
              type="number"
              value={formData.budget}
              onChange={handleInputChange}
              required
              InputProps={{ inputProps: { min: 0 } }}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={3}
            />
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Add Project
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <div
        style={{
          display: 'grid',
          gap: '20px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        }}
      >
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader
              action={
                <IconButton color="error" onClick={() => deleteProject(project.id)}>
                  <Delete />
                </IconButton>
              }
              title={project.projectName}
            />
            <CardContent>
              <Typography variant="body2">
                <strong>Location:</strong> {project.location}
              </Typography>
              <Typography variant="body2">
                <strong>Start Date:</strong> {project.startDate}
              </Typography>
              <Typography variant="body2">
                <strong>Department:</strong> {project.department}
              </Typography>
              <Typography variant="body2">
                <strong>Employees:</strong> {project.numberOfEmployees}
              </Typography>
              <Typography variant="body2">
                <strong>Budget:</strong> ${project.budget}
              </Typography>
              <Typography variant="body2">
                <strong>Description:</strong> {project.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Project;
