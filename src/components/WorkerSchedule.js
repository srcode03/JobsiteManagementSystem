import React, { useState } from 'react';
import { CalendarToday, Add, Delete, Business, LocationOn, AccessTime, ArrowBack, ArrowForward } from '@mui/icons-material';
import { 
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Chip,
  Box,
  Grid,
  IconButton,
  Divider,
  FormLabel,
} from '@mui/material';

const WorkerSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(getStartOfWeek());
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    workerId: '',
    workerName: '',
    department: '',
    shift: 'day',
    monday: { assigned: false, project: '', location: '' },
    tuesday: { assigned: false, project: '', location: '' },
    wednesday: { assigned: false, project: '', location: '' },
    thursday: { assigned: false, project: '', location: '' },
    friday: { assigned: false, project: '', location: '' },
    saturday: { assigned: false, project: '', location: '' },
    sunday: { assigned: false, project: '', location: '' },
  });

  const departments = ['Civil', 'Electrical', 'Mechanical', 'Plumbing', 'Carpentry', 'Safety', 'General Labor'];
  const projects = ['Project A', 'Project B', 'Project C', 'Project D'];
  const locations = ['Site 1', 'Site 2', 'Site 3', 'Warehouse'];
  const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  function getStartOfWeek() {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(now.setDate(diff));
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDayChange = (day, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  const handleDayToggle = (day) => {
    setFormData((prev) => ({
      ...prev,
      [day]: { ...prev[day], assigned: !prev[day].assigned },
    }));
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    const newSchedule = {
      ...formData,
      id: Date.now(),
      week: selectedWeek.toISOString(),
    };
    setSchedules((prev) => [...prev, newSchedule]);
    setWorkers((prev) => {
      if (!prev.find((w) => w.workerId === formData.workerId)) {
        return [...prev, {
          workerId: formData.workerId,
          name: formData.workerName,
          department: formData.department,
        }];
      }
      return prev;
    });
    setFormData({
      workerId: '',
      workerName: '',
      department: '',
      shift: 'day',
      monday: { assigned: false, project: '', location: '' },
      tuesday: { assigned: false, project: '', location: '' },
      wednesday: { assigned: false, project: '', location: '' },
      thursday: { assigned: false, project: '', location: '' },
      friday: { assigned: false, project: '', location: '' },
      saturday: { assigned: false, project: '', location: '' },
      sunday: { assigned: false, project: '', location: '' },
    });
    setOpenDialog(false);
  };

  const getShiftColor = (shift) => {
    switch (shift) {
      case 'day':
        return 'warning';
      case 'swing':
        return 'primary';
      case 'night':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 'lg', mx: 'auto' }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CalendarToday sx={{ fontSize: 32, color: 'primary.main' }} />
            <Typography variant="h4" component="h1">Worker Schedule</Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenDialog(true)}
          >
            Add Schedule
          </Button>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          bgcolor: 'action.hover',
          borderRadius: 1,
          p: 2
        }}>
          <IconButton onClick={() => setSelectedWeek((prev) => addDays(prev, -7))}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6">
            Week of {formatDate(selectedWeek)}
          </Typography>
          <IconButton onClick={() => setSelectedWeek((prev) => addDays(prev, 7))}>
            <ArrowForward />
          </IconButton>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {schedules
          .filter((schedule) => new Date(schedule.week).getTime() === new Date(selectedWeek).getTime())
          .map((schedule) => (
            <Grid item xs={12} md={6} lg={4} key={schedule.id}>
              <Card variant="outlined">
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6">{schedule.workerName}</Typography>
                      <Chip label={schedule.workerId} variant="outlined" size="small" />
                    </Box>
                  }
                  subheader={
                    <Box sx={{ mt: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Business fontSize="small" color="action" />
                        <Typography variant="body2" color="textSecondary">
                          {schedule.department}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccessTime fontSize="small" color="action" />
                        <Chip
                          label={`${schedule.shift.charAt(0).toUpperCase() + schedule.shift.slice(1)} Shift`}
                          color={getShiftColor(schedule.shift)}
                          size="small"
                        />
                      </Box>
                    </Box>
                  }
                  sx={{ bgcolor: 'action.hover' }}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {weekDays.map((day) => (
                      <Box key={day}>
                        <Typography variant="subtitle2" sx={{ textTransform: 'capitalize', mb: 1 }}>
                          {day}
                        </Typography>
                        {schedule[day].assigned ? (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                            <Chip
                              label={schedule[day].project}
                              size="small"
                              color="primary"
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <LocationOn fontSize="small" color="action" />
                              <Typography variant="body2" color="textSecondary">
                                {schedule[day].location}
                              </Typography>
                            </Box>
                          </Box>
                        ) : (
                          <Typography variant="body2" color="textSecondary">
                            Not Assigned
                          </Typography>
                        )}
                        <Divider sx={{ mt: 1 }} />
                      </Box>
                    ))}
                  </Box>
                </CardContent>
                <CardActions sx={{ bgcolor: 'action.hover', justifyContent: 'flex-end' }}>
                  <Button
                    startIcon={<Delete />}
                    color="error"
                    onClick={() => setSchedules((prev) => prev.filter((s) => s.id !== schedule.id))}
                  >
                    Delete Schedule
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>

      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Add Worker Schedule</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Worker ID"
                  name="workerId"
                  value={formData.workerId}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Worker Name"
                  name="workerName"
                  value={formData.workerName}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Department</InputLabel>
                  <Select
                    value={formData.department}
                    onChange={handleInputChange}
                    name="department"
                    label="Department"
                  >
                    {departments.map((dept) => (
                      <MenuItem key={dept} value={dept.toLowerCase()}>
                        {dept}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Shift</InputLabel>
                  <Select
                    value={formData.shift}
                    onChange={handleInputChange}
                    name="shift"
                    label="Shift"
                  >
                    <MenuItem value="day">Day Shift (6:00 AM - 2:00 PM)</MenuItem>
                    <MenuItem value="swing">Swing Shift (2:00 PM - 10:00 PM)</MenuItem>
                    <MenuItem value="night">Night Shift (10:00 PM - 6:00 AM)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4 }}>
              {weekDays.map((day) => (
                <Box
                  key={day}
                  sx={{
                    mt: 2,
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData[day].assigned}
                        onChange={() => handleDayToggle(day)}
                      />
                    }
                    label={<Typography sx={{ textTransform: 'capitalize' }}>{day}</Typography>}
                  />
                  
                  {formData[day].assigned && (
                    <Box sx={{ pl: 4, mt: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth>
                            <InputLabel>Project</InputLabel>
                            <Select
                              value={formData[day].project}
                              onChange={(e) => handleDayChange(day, 'project', e.target.value)}
                              label="Project"
                            >
                              {projects.map((project) => (
                                <MenuItem key={project} value={project}>
                                  {project}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth>
                            <InputLabel>Location</InputLabel>
                            <Select
                              value={formData[day].location}
                              onChange={(e) => handleDayChange(day, 'location', e.target.value)}
                              label="Location"
                            >
                              {locations.map((location) => (
                                <MenuItem key={location} value={location}>
                                  {location}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Add Schedule</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WorkerSchedule;