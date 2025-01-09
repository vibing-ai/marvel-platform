import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export const useRubricGenerator = () => {
  const user = useSelector((state) => state.user.data);

  const [gradeLevel, setGradeLevel] = useState("");
  const [pointScale, setPointScale] = useState("");
  const [standards, setStandards] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openFileUploadDialog, setOpenFileUploadDialog] = useState(false);
  const [objectivesFileUrl, setObjectivesFileUrl] = useState("");
  const [assignmentDescriptionFileUrl, setAssignmentDescriptionFileUrl] = useState("");

  const handleFileUploadClick = () => {
    setOpenFileUploadDialog(true);
  };

  const handleFileUpload = (fileType, fileUrl) => {
    if (fileType === "objectives") {
      setObjectivesFileUrl(fileUrl);
    } else if (fileType === "assignment_description") {
      setAssignmentDescriptionFileUrl(fileUrl);
    }
  };

  const handleGenerateRubric = async (onGenerateRubric) => {
    if (!gradeLevel || !pointScale || !assignmentDescription) {
      setError("All fields are required.");
      return;
    }

    const payload = {
      user: user,
      type: "chat",
      tool_data: {
        tool_id: "rubric-generator",
        inputs: [
          { name: "grade_level", value: gradeLevel },
          { name: "point_scale", value: parseInt(pointScale) },
          { name: "objectives", value: standards },
          { name: "assignment_description", value: assignmentDescription },
          { name: "objectives_file_url", value: objectivesFileUrl },
          { name: "objectives_file_type", value: "pdf" },
          { name: "assignment_description_file_url", value: assignmentDescriptionFileUrl },
          { name: "assignment_description_file_type", value: "gdoc" },
          { name: "lang", value: "en" },
        ],
      },
    };

    try {
      setError("");
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_MARVEL_ENDPOINT}submit-tool`,
        payload,
        {
          headers: {
            "API-Key": "dev",
            "Content-Type": "application/json",
          },
        }
      );
      onGenerateRubric(response.data);
    } catch (err) {
      console.error("Error response:", err.response || err.message);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to generate rubric. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    gradeLevel,
    setGradeLevel,
    pointScale,
    setPointScale,
    standards,
    setStandards,
    assignmentDescription,
    setAssignmentDescription,
    loading,
    error,
    openFileUploadDialog,
    setOpenFileUploadDialog,
    handleFileUploadClick,
    handleFileUpload,
    handleGenerateRubric,
  };
};
