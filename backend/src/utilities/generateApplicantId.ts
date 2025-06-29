import Recruit from "../modules/recruit/model";

export const generateApplicantId = async () => {
  let applicantId;
  const applicants = await Recruit.find({});
  if (applicants.length === 0) {
    applicantId = "BFPNCRREC202501-0001";
    return applicantId;
  }
  const ids = applicants.map((applicant) => applicant.applicantId);
  const highestNumber = ids
    .map((doc) => doc.split("-")[1])
    .reduce((max, current) => (current > max ? current : max));
  const newDocNumber = parseInt(highestNumber, 10) + 1;
  const paddedResult = newDocNumber
    .toString()
    .padStart(highestNumber.length, "0");

  applicantId = `BFPNCRREC202501-${paddedResult}`;
  return applicantId;
};
