import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Plus, Wrench, User, Calendar, AlertTriangle } from 'lucide-react';

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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8000/equipment')
            .then((response) => {
                if (response.data.success) {
                    setEquipment(response.data.equipment);
                } else {
                    console.error('Failed to fetch equipment:', response.data.error);
                }
            })
            .catch((error) => console.error('Error fetching equipment:', error))
            .finally(() => setLoading(false));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/equipment', formData)
            .then((response) => {
                if (response.data.success) {
                    setEquipment((prev) => [...prev, { ...formData, id: Date.now().toString() }]);
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
                } else {
                    console.error('Error adding equipment:', response.data.error);
                }
            })
            .catch((error) => console.error('Error adding equipment:', error));
    };

    const getStatusColor = (status) => {
        const colors = {
            'available': '#4caf50',
            'in-use': '#2196f3',
            'maintenance': '#ff9800',
            'repair': '#f44336'
        };
        return colors[status] || '#757575';
    };

    const getConditionColor = (condition) => {
        const colors = {
            'good': '#4caf50',
            'fair': '#ff9800',
            'poor': '#f44336'
        };
        return colors[condition] || '#757575';
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <Typography 
                        variant="h4" 
                        component="h1" 
                        className="flex items-center gap-3"
                        sx={{
                            fontWeight: 'bold',
                            color: '#1976d2',
                            display: 'flex',
                            alignItems: 'center',
                            '& svg': {
                                marginRight: 1
                            }
                        }}
                    >
                        <Wrench className="h-8 w-8" />
                        Equipment Tracker
                    </Typography>

                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Plus />}
                        onClick={() => setOpen(true)}
                        sx={{
                            borderRadius: '8px',
                            textTransform: 'none',
                            fontWeight: 600,
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            '&:hover': {
                                boxShadow: '0 4px 6px rgba(0,0,0,0.12)'
                            }
                        }}
                    >
                        Add New Equipment
                    </Button>
                </div>

                <Dialog 
                    open={open} 
                    onClose={() => setOpen(false)} 
                    maxWidth="sm" 
                    fullWidth
                    PaperProps={{
                        sx: {
                            borderRadius: '12px',
                            boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                        }
                    }}
                >
                    <DialogTitle sx={{ 
                        borderBottom: '1px solid #e0e0e0',
                        pb: 2,
                        fontSize: '1.5rem',
                        fontWeight: 600
                    }}>
                        Add New Equipment
                    </DialogTitle>
                    <DialogContent sx={{ pt: 3 }}>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <TextField
                                    label="Equipment ID"
                                    name="equipmentId"
                                    value={formData.equipmentId}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel>Type</InputLabel>
                                    <Select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="type1">Type 1</MenuItem>
                                        <MenuItem value="type2">Type 2</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="available">Available</MenuItem>
                                        <MenuItem value="in-use">In Use</MenuItem>
                                        <MenuItem value="maintenance">Maintenance</MenuItem>
                                        <MenuItem value="repair">Repair</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <TextField
                                    label="Operator"
                                    name="operator"
                                    value={formData.operator}
                                    onChange={handleInputChange}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="Location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <TextField
                                    label="Last Maintenance"
                                    type="date"
                                    name="lastMaintenance"
                                    value={formData.lastMaintenance}
                                    onChange={handleInputChange}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="Next Maintenance"
                                    type="date"
                                    name="nextMaintenance"
                                    value={formData.nextMaintenance}
                                    onChange={handleInputChange}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ mb: 2 }}
                                />
                            </div>

                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Condition</InputLabel>
                                <Select
                                    name="condition"
                                    value={formData.condition}
                                    onChange={handleInputChange}
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
                                sx={{ mb: 2 }}
                            />

                            <DialogActions sx={{ 
                                borderTop: '1px solid #e0e0e0',
                                mt: 2, 
                                pt: 2,
                                px: 0 
                            }}>
                                <Button 
                                    onClick={() => setOpen(false)}
                                    sx={{ 
                                        color: 'text.secondary',
                                        textTransform: 'none'
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    color="primary"
                                    sx={{
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        px: 4
                                    }}
                                >
                                    Add Equipment
                                </Button>
                            </DialogActions>
                        </form>
                    </DialogContent>
                </Dialog>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {equipment.map((item) => (
                        <Card 
                            key={item.id} 
                            sx={{ 
                                borderRadius: '12px',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
                                }
                            }}
                        >
                            <CardHeader
                                title={
                                    <div className="flex justify-between items-start">
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            {item.name}
                                        </Typography>
                                        <div 
                                            className="px-3 py-1 rounded-full text-sm"
                                            style={{
                                                backgroundColor: `${getStatusColor(item.status)}20`,
                                                color: getStatusColor(item.status),
                                                fontWeight: 500
                                            }}
                                        >
                                            {item.status}
                                        </div>
                                    </div>
                                }
                                sx={{
                                    backgroundColor: '#f8f9fa',
                                    borderBottom: '1px solid #eee'
                                }}
                            />
                            <CardContent sx={{ p: 3 }}>
                                <div className="space-y-3">
                                    <Typography className="flex items-center gap-2" color="text.secondary">
                                        <strong>ID:</strong> {item.equipmentId}
                                    </Typography>
                                    <Typography className="flex items-center gap-2" color="text.secondary">
                                        <strong>Type:</strong> {item.type}
                                    </Typography>
                                    <Typography className="flex items-center gap-2" color="text.secondary">
                                        <User size={16} />
                                        <strong>Operator:</strong> {item.operator || 'Unassigned'}
                                    </Typography>
                                    <Typography className="flex items-center gap-2" color="text.secondary">
                                        <strong>Location:</strong> {item.location}
                                    </Typography>
                                    <Typography className="flex items-center gap-2" color="text.secondary">
                                        <Calendar size={16} />
                                        <strong>Next Maintenance:</strong> {item.nextMaintenance}
                                    </Typography>
                                    <Typography 
                                        className="flex items-center gap-2" 
                                        style={{ color: getConditionColor(item.condition) }}
                                    >
                                        <strong>Condition:</strong> {item.condition}
                                    </Typography>
                                    {item.notes && (
                                        <Typography 
                                            variant="body2" 
                                            color="text.secondary"
                                            sx={{ 
                                                mt: 2,
                                                fontStyle: 'italic',
                                                backgroundColor: '#f8f9fa',
                                                p: 1.5,
                                                borderRadius: '8px'
                                            }}
                                        >
                                            {item.notes}
                                        </Typography>
                                    )}
                                    {new Date(item.nextMaintenance) <= new Date() && (
                                        <div 
                                            className="flex items-center gap-2 mt-2 p-2 rounded-lg"
                                            style={{
                                                backgroundColor: '#fff5f5',
                                                color: '#e53e3e'
                                            }}
                                        >
                                            <AlertTriangle size={16} />
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                Maintenance overdue!
                                            </Typography>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Equipment;