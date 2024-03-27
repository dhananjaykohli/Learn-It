import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Module from '../../model/module';
 
const ModuleEdit: React.FC = () => {
  const [module, setModule] = useState<Module>({
    moduleId: 0,
    moduleName : " ",
    moduleDuration:" ",
  });
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchModule = async () => {
      try {
        const response = await axios.get<Module>(`http://localhost:5110/api/module/${id}`);
        const { moduleId,moduleName ,moduleDuration } = response.data;
        setModule({
            moduleId,
            moduleName ,
            moduleDuration
        });
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching Module:', error);
      }
    };
 
    fetchModule();
  }, [id]);
 
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setModule({ ...module, [name]: value });
  };
 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Send updated course data to the backend to save changes
      await axios.put(`http://localhost:5110/api/module/${id}`,module); // Modify the URL as per your backend endpoint
      console.log('Module updated successfully:',module);
      alert('Module updated successfully')
      navigate(-1)
      // Optionally, you can navigate to another page or show a success message here
    } catch (error) {
      console.error('Error updating Lecture:', error);
      alert('Module updation unsuccessful')
    }
  };
 
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        width={400}
        padding={2}
      >
        <h1> Edit Module</h1>
        <TextField
          fullWidth
          label="Name"
          name="moduleName"
          value={module.moduleName}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          type="text"
          label="Duration"
          name="moduleDuration"
          value={module.moduleDuration}
          onChange={handleChange}
          margin="normal"
        />
        <Button type="submit" variant="contained"  color="primary">
          Save
        </Button>
      </Box>
    </Box>
  );
};
 
export default ModuleEdit;