import Recruit from "./model";
import { RecruitSchema, RecruitType } from "./validation";
import { generateApplicantId } from "../../utilities/generateApplicantId";
import { uploadApplicantPicture } from "../../utilities/uploadApplicantPicture";

const addRecruitService = async (body: RecruitType) => {
  if (!RecruitSchema.safeParse(body)) {
    const error: any = new Error("Validation failed");
    error.name = "ValidationError";
    error.status = 400;
    throw error;
  }

  const applicantId = await generateApplicantId();

  const { publicId, optimizeUrl } = await uploadApplicantPicture(body.image);

  const newRecruit = await Recruit.create({
    applicantId: applicantId,
    firstName: body.firstName,
    lastName: body.lastName,
    middleName: body.middleName,
    email: body.email,
    birthDate: body.birthDate,
    gender: body.gender,
    address: body.address,
    course: body.course,
    eligibility: body.eligibility,
    phoneNumber: body.phoneNumber,
    images: {
      url: optimizeUrl,
      publicId: publicId,
    },
  });
  return newRecruit;
};

const getRecuitsPerPageService = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const [recruits, total] = await Promise.all([
    Recruit.find({}).skip(skip).limit(limit),
    Recruit.countDocuments(),
  ]);

  return {
    recruits,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
  };
};

export default {
  addRecruitService,
  getRecuitsPerPageService,
};
