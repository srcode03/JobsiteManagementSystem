import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Checkbox,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper
} from '@mui/material';
import {
  Calendar,
  Clock,
  Construction,
  Truck,
  AlertTriangle,
  ClipboardCheck,
  Users,
  Package
} from 'lucide-react';

// Dashboard Component
const Dashboard = () => {
  const [activeProjects, setActiveProjects] = useState(5);
  const [workers, setWorkers] = useState(32);
  const [equipment, setEquipment] = useState(12);
  const [incidents, setIncidents] = useState(0);

  return (
    <Box sx={{ p: 3 }}>

      
      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard 
            icon={<ClipboardCheck />}
            title="Active Projects"
            value={activeProjects}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard 
            icon={<Users />}
            title="Workers On Site"
            value={workers}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard 
            icon={<Construction />}
            title="Equipment In Use"
            value={equipment}
            color="#ed6c02"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard 
            icon={<AlertTriangle />}
            title="Safety Incidents"
            value={incidents}
            color="#d32f2f"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <ProjectList />
        </Grid>
        <Grid item xs={12} lg={6}>
          <SafetyChecklist />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} lg={6}>
          <EquipmentTracker />
        </Grid>
        <Grid item xs={12} lg={6}>
          <WorkerSchedule />
        </Grid>
      </Grid>
    </Box>
  );
};

// Stat Card Component
const StatCard = ({ icon, title, value, color }) => (
  <Card>
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ color: color, mr: 2 }}>
          {icon}
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h5">
            {value}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

// Project List Component
const ProjectList = () => {
  const [projects] = useState([
    { id: 1, name: 'Foundation Work', status: 'In Progress', completion: 65 },
    { id: 2, name: 'Electrical Installation', status: 'Pending', completion: 0 },
    { id: 3, name: 'Plumbing Setup', status: 'In Progress', completion: 30 },
  ]);

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <ClipboardCheck size={20} sx={{ mr: 1 }} />
          <Typography variant="h6">Active Projects</Typography>
        </Box>
        <List>
          {projects.map((project, index) => (
            <React.Fragment key={project.id}>
              <ListItem>
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle1">{project.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {project.completion}%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={project.completion}
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {project.status}
                  </Typography>
                </Box>
              </ListItem>
              {index < projects.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

// Safety Checklist Component
const SafetyChecklist = () => {
  const [checks, setChecks] = useState([
    { id: 1, item: 'PPE Equipment Check', completed: true },
    { id: 2, item: 'Site Hazard Assessment', completed: true },
    { id: 3, item: 'Equipment Inspection', completed: false },
    { id: 4, item: 'Safety Briefing', completed: false },
  ]);

  const toggleCheck = (id) => {
    setChecks(checks.map(check => 
      check.id === id ? { ...check, completed: !check.completed } : check
    ));
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Construction size={20} sx={{ mr: 1 }} />
          <Typography variant="h6">Daily Safety Checklist</Typography>
        </Box>
        <List>
          {checks.map((check, index) => (
            <ListItem
              key={check.id}
              sx={{
                '&:hover': { bgcolor: 'action.hover' },
                cursor: 'pointer'
              }}
              onClick={() => toggleCheck(check.id)}
            >
              <Checkbox
                checked={check.completed}
                onChange={() => toggleCheck(check.id)}
              />
              <ListItemText
                primary={check.item}
                sx={{
                  textDecoration: check.completed ? 'line-through' : 'none',
                  color: check.completed ? 'text.secondary' : 'text.primary'
                }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

// Equipment Tracker Component
const EquipmentTracker = () => {
  const [equipment] = useState([
    { id: 1, name: 'Excavator', status: 'In Use', operator: 'John Doe' },
    { id: 2, name: 'Crane', status: 'Available', operator: '-' },
    { id: 3, name: 'Bulldozer', status: 'Maintenance', operator: '-' },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Use': return 'success';
      case 'Maintenance': return 'error';
      default: return 'info';
    }
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Truck size={20} sx={{ mr: 1 }} />
          <Typography variant="h6">Equipment Tracker</Typography>
        </Box>
        <List>
          {equipment.map((item, index) => (
            <React.Fragment key={item.id}>
              <ListItem>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle1">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Operator: {item.operator}
                    </Typography>
                  </Box>
                  <Chip
                    label={item.status}
                    color={getStatusColor(item.status)}
                    size="small"
                  />
                </Box>
              </ListItem>
              {index < equipment.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

// Worker Schedule Component
const WorkerSchedule = () => {
  const [schedule] = useState([
    { id: 1, name: 'Morning Shift', workers: 12, time: '6:00 AM - 2:00 PM' },
    { id: 2, name: 'Day Shift', workers: 15, time: '2:00 PM - 10:00 PM' },
    { id: 3, name: 'Night Shift', workers: 5, time: '10:00 PM - 6:00 AM' },
  ]);

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Clock size={20} sx={{ mr: 1 }} />
          <Typography variant="h6">Worker Schedule</Typography>
        </Box>
        <List>
          {schedule.map((shift, index) => (
            <React.Fragment key={shift.id}>
              <ListItem>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle1">{shift.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {shift.time}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Users size={16} style={{ marginRight: 8 }} />
                    <Typography>{shift.workers}</Typography>
                  </Box>
                </Box>
              </ListItem>
              {index < schedule.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default Dashboard;