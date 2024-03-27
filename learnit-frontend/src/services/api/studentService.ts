import axios, { AxiosResponse } from "axios";
import Student from "../../model/student";

export const AddStudent = async (student: Student): Promise<Student> => {
  try {
    const data = JSON.stringify(student);
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:5110/api/student",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response: Student = await axios.request(config);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error");
    }
  }
};

export const GetStudents = async () => {
  try {
    const response: AxiosResponse<Student[]> = await axios.get(
      "http://localhost:5110/api/student"
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error");
    }
  }
};

export const GetStudent = async (id: number): Promise<Student> => {
  try {
    const response: AxiosResponse<Student> = await axios.get(
      `http://localhost:5110/api/student/${id}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error");
    }
  }
};

export const UpdateStudent = async (newDetails: Student) => {
  try {
    const data = JSON.stringify(newDetails);
    const config = {
      method: "put",
      url: `http://localhost:5110/api/student/${newDetails.studentId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios.request(config);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error");
    }
  }
};

export const AuthStudent = async (email: string, password: string) => {
  try {
    const data = JSON.stringify({
      email: email,
      password: password,
    });
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:5110/api/student/auth",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error");
    }
  }
};
