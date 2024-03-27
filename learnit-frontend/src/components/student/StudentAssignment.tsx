import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAssignmentByCourseId } from '../../services/api/assignmentService';
import Assignment from '../../model/assignment';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
 
const StudentAssignment = () => {
 const [assignments, setAssignments] = useState<Assignment[]>([]);
 const { id } = useParams<{ id: string }>();
 
 useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const assignmentsData = await getAssignmentByCourseId(Number(id));
        setAssignments(assignmentsData);
        console.log(assignmentsData);
      } catch (error) {
        console.error('Failed to fetch assignments:', error);
      }
    };
 
    if (id) {
      fetchAssignments();
    }
 }, [id]);
 
 return (
    <div>
      <h2>Assignments</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Assignment Details</TableCell>
              <TableCell>Deadline</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map((assignment, index) => (
              <TableRow key={index}>
                <TableCell>{assignment.aDetails}</TableCell>
                <TableCell>{assignment.aDeadline}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
 );
};
 
export default StudentAssignment;