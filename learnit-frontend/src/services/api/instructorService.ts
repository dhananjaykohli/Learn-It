import axios, { AxiosResponse } from "axios";
import Instructor from "../../model/instructor";

export const AddInstructor = async (
  instructor: Instructor
): Promise<Instructor> => {
  try {
    const data = JSON.stringify(instructor);
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:5110/api/instructor",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response: Instructor = await axios.request(config);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error");
    }
  }
};

export const GetInstructors = async (): Promise<Instructor[]> => {
  try {
    const response: AxiosResponse<Instructor[]> = await axios.get(
      "http://localhost:5110/api/instructor"
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

export const GetInstructor = async (id: number): Promise<Instructor> => {
  try {
    const response: AxiosResponse<Instructor> = await axios.get(
      `http://localhost:5110/api/instructor/${id}`
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

export const UpdateInstructor = async (newDetails: Instructor) => {
  try {
    const data = JSON.stringify(newDetails);
    const config = {
      method: "put",
      url: `http://localhost:5110/api/instructor/${newDetails.instructorId}`,
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

export const AuthInstructor = async (email: string, password: string) => {
  try {
    const data = JSON.stringify({
      email: email,
      password: password,
    });
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:5110/api/instructor/auth",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("email not found");
      } else if (error.status === 400) {
        throw new Error("email or password is invalid");
      } else if (error.status === 401) {
        throw new Error("wrong password");
      } else {
        throw new Error(error.message);
      }
    } else {
      throw new Error("Unknown error");
    }
  }
};
