import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  CardMedia,
  CardActionArea,
} from '@mui/material';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Badge,
} from '@mui/material';
import { Plus, Wrench, User, Calendar, AlertTriangle } from 'lucide-react'; // Using Wrench instead of Tool

const Equipment = () => {
  const [equipment, setEquipment] = useState([]);
  const [formData, setFormData] = useState({
    equipmentId: '',
    name: '',
    type: '',
    status: 'available',
    operator: '',
    lastMaintenance: '',
    nextMaintenance: '',
    location: '',
    condition: 'good',
    notes: '',
  });
  const [open, setOpen] = useState(false);

  const equipmentTypes = [
    'Excavator',
    'Bulldozer',
    'Crane',
    'Loader',
    'Dump Truck',
    'Forklift',
    'Generator',
    'Compressor',
    'Concrete Mixer',
    'Other',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEquipment((prev) => [...prev, { ...formData, id: Date.now() }]);
    setFormData({
      equipmentId: '',
      name: '',
      type: '',
      status: 'available',
      operator: '',
      lastMaintenance: '',
      nextMaintenance: '',
      location: '',
      condition: 'good',
      notes: '',
    });
    setOpen(false);
  };

  const getStatusColor = (status) => {
    const colors = {
      available: 'success',
      'in-use': 'primary',
      maintenance: 'warning',
      repair: 'error',
    };
    return colors[status] || 'default';
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <Typography variant="h4" component="h1" gutterBottom className="flex items-center gap-2">
        <Wrench className="h-6 w-6" /> {/* Using Wrench icon instead */}
        Equipment Tracker
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<Plus />}
        onClick={() => setOpen(true)}
      >
        Add New Equipment
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Equipment</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Equipment ID"
              name="equipmentId"
              value={formData.equipmentId}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={formData.type}
                onChange={(e) => handleInputChange(e)}
              >
                {equipmentTypes.map((type) => (
                  <MenuItem key={type} value={type.toLowerCase()}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={(e) => handleInputChange(e)}
              >
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="in-use">In Use</MenuItem>
                <MenuItem value="maintenance">Maintenance</MenuItem>
                <MenuItem value="repair">Repair</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Operator"
              name="operator"
              value={formData.operator}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Last Maintenance"
              type="date"
              name="lastMaintenance"
              value={formData.lastMaintenance}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Next Maintenance"
              type="date"
              name="nextMaintenance"
              value={formData.nextMaintenance}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Condition</InputLabel>
              <Select
                name="condition"
                value={formData.condition}
                onChange={(e) => handleInputChange(e)}
              >
                <MenuItem value="good">Good</MenuItem>
                <MenuItem value="fair">Fair</MenuItem>
                <MenuItem value="poor">Poor</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={3}
              margin="normal"
            />
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                Add Equipment
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {equipment.map((item) => (
          <Card key={item.id} sx={{ padding: 2 }}>
            <CardHeader title={item.name} />
            <CardContent>
              <Typography>
                <strong>ID:</strong> {item.equipmentId}
              </Typography>
              <Typography>
                <strong>Type:</strong> {item.type}
              </Typography>
              <Typography>
                <User size={16} /> <strong>Operator:</strong> {item.operator || 'Unassigned'}
              </Typography>
              <Typography>
                <strong>Location:</strong> {item.location}
              </Typography>
              <Typography>
                <Calendar size={16} /> <strong>Next Maintenance:</strong> {item.nextMaintenance}
              </Typography>
              <Typography>
                <strong>Condition:</strong> {item.condition}
              </Typography>
              {item.notes && (
                <Typography color="textSecondary" variant="body2">
                  {item.notes}
                </Typography>
              )}
              {new Date(item.nextMaintenance) <= new Date() && (
                <Typography color="error" variant="body2">
                  <AlertTriangle size={16} /> Maintenance overdue!
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Equipment;
