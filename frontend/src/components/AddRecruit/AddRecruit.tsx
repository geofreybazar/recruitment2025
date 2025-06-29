import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { recruitSchema, type RecruitType } from "../../utilities/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useAddRecruit from "../../hooks/recruit/useAddRecruit";
import ModalComponent from "../ReusableComponents/ModalComponent";
import variables from "../../utilities/variables";
import PictureModal from "./PictureModal";
import defaultPicture from "/defaultPicture.png";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import type { AxiosError } from "axios";

const AddRecruit = () => {
  const [image, setImage] = useState("");
  const [openPictureModal, setOpenPictureModal] = useState(false);
  const { addRecruit, isPending } = useAddRecruit();

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<RecruitType>({
    resolver: zodResolver(recruitSchema),
    defaultValues: {
      gender: "Male",
    },
  });

  const handleSetImage = (src: string) => setImage(src);
  const onSubmit = async (data: RecruitType) => {
    try {
      if (!image) {
        setError("root", {
          message: "Please capture a picture before submitting.",
        });
        return;
      }
      const recruitData = {
        ...data,
        image,
      };
      await addRecruit(recruitData);

      setImage("");
    } catch (error: any) {
      const axiosError = error as AxiosError<{ error: string }>;
      setError("root", {
        message:
          axiosError.response?.data?.error || "An unexpected error occurred",
      });
    }
  };

  return (
    <div>
      <p className='pb-2 text-xl'>Applicant Information</p>
      <form
        className='w-full flex  gap-5 justify-center'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='w-2/3 flex flex-col gap-4'>
          <div className='flex flex-col gap-2 p-5 border border-gray-200 bg-offwhite shadow-xl rounded-xl'>
            <div className='flex gap-2'>
              <TextField
                fullWidth
                label='First name'
                size='small'
                variant='outlined'
                {...register("firstName")}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
              <TextField
                fullWidth
                label='Last name'
                size='small'
                variant='outlined'
                {...register("middleName")}
                error={!!errors.middleName}
                helperText={errors.middleName?.message}
              />
              <TextField
                fullWidth
                label='Middle name'
                size='small'
                variant='outlined'
                {...register("lastName")}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </div>
            <div className='flex gap-2'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name={"birthDate"}
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      className='w-full'
                      label={"Date of birth"}
                      {...field}
                      value={field.value ? dayjs(field.value) : null}
                      slotProps={{
                        textField: {
                          variant: "outlined",
                          error: !!errors["birthDate"],
                          helperText: errors["birthDate"]?.message || "",
                        },
                      }}
                      onChange={(date) =>
                        field.onChange(date ? date.format("YYYY-MM-DD") : null)
                      }
                    />
                  )}
                />
              </LocalizationProvider>
              <FormControl fullWidth error={!!errors.gender}>
                <InputLabel error={!!errors.gender}>Gender</InputLabel>
                <Controller
                  name={"gender"}
                  control={control}
                  render={({ field }) => (
                    <Select
                      labelId='select-labesl'
                      label={"gender"}
                      {...field}
                      variant='outlined'
                    >
                      <MenuItem value='Male'>Male</MenuItem>
                      <MenuItem value='Female'>Female</MenuItem>
                    </Select>
                  )}
                />
                <FormHelperText>
                  {(errors["gender"]?.message as string) || ""}
                </FormHelperText>
              </FormControl>
            </div>
          </div>

          <div className='flex flex-col gap-2 p-5 border border-gray-200 bg-offwhite shadow-xl rounded-xl'>
            <TextField
              fullWidth
              label='Complete address'
              size='small'
              variant='outlined'
              {...register("address")}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
            <div className='flex gap-2'>
              <TextField
                fullWidth
                label='Email address'
                size='small'
                variant='outlined'
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <TextField
                fullWidth
                label='Phone number'
                size='small'
                variant='outlined'
                {...register("phoneNumber")}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
              />
            </div>
            <div className='flex gap-2'>
              <TextField
                fullWidth
                label='Course'
                size='small'
                variant='outlined'
                {...register("course")}
                error={!!errors.course}
                helperText={errors.course?.message}
              />
              <TextField
                fullWidth
                label='Eligibility'
                size='small'
                variant='outlined'
                {...register("eligibility")}
                error={!!errors.eligibility}
                helperText={errors.eligibility?.message}
              />
            </div>
          </div>

          <Button
            fullWidth
            type='submit'
            variant='contained'
            size='small'
            color='primary'
            loading={isPending}
          >
            Save
          </Button>
          {errors.root && (
            <div className='text-center text-red-600 '>
              {errors.root.message}
            </div>
          )}
        </div>

        <div className='w-1/3 flex flex-col justify-center items-center gap-4'>
          {image ? (
            <img
              src={image}
              width={250}
              height={250}
              className='border shadow-xl rounded-xl'
            />
          ) : (
            <img
              src={defaultPicture}
              width={250}
              height={250}
              className='border shadow-xl rounded-xl'
            />
          )}

          <Button
            onClick={() => setOpenPictureModal(true)}
            variant='contained'
            size='small'
            color='bfpRed'
          >
            {image ? <>Take Another Picture</> : <>Take A Picture</>}
          </Button>
        </div>
      </form>

      <ModalComponent
        open={openPictureModal}
        onClose={() => setOpenPictureModal(false)}
        style={variables.style}
      >
        <PictureModal
          handleSetImage={handleSetImage}
          onClose={() => setOpenPictureModal(false)}
        />
      </ModalComponent>
    </div>
  );
};

export default AddRecruit;
