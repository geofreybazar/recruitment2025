import { type SxProps, type Theme } from "@mui/system";
const style: SxProps<Theme> = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const sampleRecruitData = [
  {
    id: "1",
    firstName: "Juan",
    lastName: "Dela Cruz",
    middleName: "Santos",
    age: 24,
    gender: "Male",
    address: "123 Barangay Malinis, Quezon City, Metro Manila",
    course: "Bachelor of Science in Criminology",
    eligibility: "Civil Service Professional",
  },
  {
    id: "2",
    firstName: "Maria",
    lastName: "Reyes",
    middleName: "Lopez",
    age: 26,
    gender: "Female",
    address: "456 Purok Luntian, Calamba, Laguna",
    course: "Bachelor of Science in Nursing",
    eligibility: "PRC Registered Nurse",
  },
  {
    id: "3",
    firstName: "Mark",
    lastName: "Fernandez",
    middleName: "Diaz",
    age: 25,
    gender: "Male",
    address: "789 Mabini Street, Cebu City, Cebu",
    course: "Bachelor of Science in Public Administration",
    eligibility: "Civil Service Subprofessional",
  },
];

const tableHead = ["Last Name", "Age", "Course", "Gender", "Eligibility"];

const tableHeadStyle = {
  color: "black",
  fontWeight: "bold",
};

export default {
  sampleRecruitData,
  tableHead,
  tableHeadStyle,
  style,
};
