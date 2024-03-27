import React, { useEffect, useState } from "react";
import axios from "axios";
import Lecture from "../../model/lecture";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Stack } from "@mui/material";

const LectureContainer = styled.div`
  padding: 20px;
`;

const LectureList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const LecturePreview = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
`;

const VideoPlayer = styled.div`
  margin-top: 10px;
`;

const StartLecture: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<Lecture[]>(`http://localhost:5110/api/lecture/module/${id}`)
      .then((response) => {
        setLectures(response.data);
      })
      .catch((error) => {
        console.log("Error fetching lectures:", error);
      });
  }, []);

  return (
    <LectureContainer>
      <h1>View Your Lectures</h1>
      <LectureList>
        {lectures.map((lecture) => (
          <LecturePreview key={lecture.lectureId}>
            <h2>{lecture.lectureName}</h2>
            <p>Lecture Duration: {lecture.lectureDuration}</p>
            <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    navigate(`/instructor/lecture/${lecture.lectureId}/edit`)
                  }
                >
                  Edit Lecture
                </Button></Stack>
            <VideoPlayer>
              <Player>
                <source src={lecture.lectureUrl} />
              </Player>
            </VideoPlayer>
          </LecturePreview>
        ))}
      </LectureList>
    </LectureContainer>
  );
};

export default StartLecture;
