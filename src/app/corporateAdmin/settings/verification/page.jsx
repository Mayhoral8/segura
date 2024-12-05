"use client";

import React from "react";
import { FormHelperText } from "@mui/material";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material";
import { Gender } from "@/config";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { FaCloudUploadAlt } from "react-icons/fa";

import { useFormik } from "formik";
import _ from "lodash";
import * as Yup from "yup";


const Verify = () => {
  const allStatus = [
    { value: 3, label: "Sole Proprieetorship" },
    { value: 1, label: "Limited Liability Company" },
    { value: 2, label: "Partnership" },
  ];

  const getInitialValues = () => {
    const newCustomer = {
      firstName: "",
      lastName: "",
      name: "",
      email: "",
      firstName: "",
      lastName: "",
      name: "",
      email: "",
      age: 18,
      avatar: 1,
      gender: Gender.FEMALE,
      industry: "",
      orders: 0,
      progress: 50,
      status: 2,
      orderStatus: "",
      contact: "",
      country: "",
      location: "",
      about: "",
      orderStatus: "",
      contact: "",
      country: "",
      location: "",
      about: "",
      // skills: [],
      time: ["just now"],
      date: "",
      time: ["just now"],
      date: "",
    };


    return newCustomer;
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const CustomerSchema = Yup.object().shape({
    firstName: Yup.string()
      .max(255)
      .required("Registered Company Name is required"),
    lastName: Yup.string().max(255).required("Registered Number is required"),
    email: Yup.string()
      .max(255)
      .required("Email is required")
      .email("Must be a valid email"),
    status: Yup.string().required("Status is required"),
    location: Yup.string().max(500),
    about: Yup.string().max(500),
    about: Yup.string().max(500),
  });

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: CustomerSchema,
    enableReinitialize: true,
    // onSubmit:
    enableReinitialize: true,
    // onSubmit:
  });
  
  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    setFieldValue,
  } = formik;
  const theme = useTheme();

  return (
    <main className="my-10 flex flex-col justify-center lg:px-10 items-center gap-y-10 w-full">
      <div className="">
        <Grid spacing={3}>
          <Grid item xs={12} md={8}>
            <h2 className="mb-5 text-2xl font-semibold">
              Basic Company Information
            </h2>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="customer-firstName">
                    Registered Company Name
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="customer-firstName"
                    placeholder="Registered Company Name"
                    {...getFieldProps("firstName")}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="customer-lastName">
                    Registered Number
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="customer-lastName"
                    placeholder="Registered Number"
                    {...getFieldProps("lastName")}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="customer-email">
                    Tax Identification Number (TIN)
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="customer-email"
                    placeholder="Tax Identification Number (TIN)"
                    {...getFieldProps("email")}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="customer-status">
                    Business Type
                  </InputLabel>
                  <FormControl fullWidth>
                    <Select
                      id="column-hiding"
                      displayEmpty
                      {...getFieldProps("status")}
                      onChange={(event) =>
                        setFieldValue("status", event.target.value)
                      }
                      input={
                        <OutlinedInput
                          id="select-column-hiding"
                          placeholder="Sort by"
                        />
                      }
                      renderValue={(selected) => {
                        if (!selected) {
                          return (
                            <Typography variant="subtitle1">
                              Select Status
                            </Typography>
                          );
                        }

                        const selectedStatus = allStatus.filter(
                          (item) => item.value === Number(selected)
                        );
                        return (
                          <Typography variant="subtitle2">
                            {selectedStatus.length > 0
                              ? selectedStatus[0].label
                              : "Pending"}
                          </Typography>
                        );
                      }}
                    >
                      {allStatus.map((column) => (
                        <MenuItem key={column.value} value={column.value}>
                          <ListItemText primary={column.label} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {touched.status && errors.status && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-email-login"
                      sx={{ pl: 1.75 }}
                    >
                      {errors.status}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="customer-fatherName">
                    Industry Sector/Nature of Business
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="customer-fatherName"
                    placeholder="Industry Sector/Nature of Business"
                    {...getFieldProps("fatherName")}
                    error={Boolean(touched.fatherName && errors.fatherName)}
                    helperText={touched.fatherName && errors.fatherName}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="customer-country">
                    Official Email Address
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="customer-country"
                    placeholder="Official email address"
                    {...getFieldProps("country")}
                    error={Boolean(touched.country && errors.country)}
                    helperText={touched.country && errors.country}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="customer-role">
                    Registered Business Address
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="customer-role"
                    placeholder="Address I"
                    {...getFieldProps("role")}
                    error={Boolean(touched.role && errors.role)}
                    helperText={touched.role && errors.role}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="customer-contact">
                    Operational Address (if different)
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="customer-contact"
                    placeholder="Address II"
                    {...getFieldProps("contact")}
                    error={Boolean(touched.contact && errors.contact)}
                    helperText={touched.contact && errors.contact}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="customer-location">
                    Phone Number
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="customer-location"
                    multiline
                    rows={1}
                    placeholder="Phone number"
                    {...getFieldProps("location")}
                    error={Boolean(touched.location && errors.location)}
                    helperText={touched.location && errors.location}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="customer-about">
                    Website (if any)
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="customer-about"
                    multiline
                    rows={1}
                    placeholder="URL"
                    {...getFieldProps("about")}
                    error={Boolean(touched.about && errors.about)}
                    helperText={touched.about && errors.about}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid spacing={3}>
          <Grid item xs={12} md={8}>
            <h2 className="mb-5 text-2xl font-semibold">
              Documents to be Uploaded
            </h2>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="customer-firstName">
                    Certificate of incorporation
                  </InputLabel>
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<FaCloudUploadAlt />}
                    className="bg-[#2C698D] hover:bg-[#204d67]"
                  >
                    Upload files
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(event) => console.log(event.target.files)}
                      multiple
                    />
                  </Button>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="customer-lastName">
                    Memorandum and Articles of Association
                  </InputLabel>
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<FaCloudUploadAlt />}
                    className="bg-[#2C698D] hover:bg-[#204d67]"
                  >
                    Upload files
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(event) => console.log(event.target.files)}
                      multiple
                    />
                  </Button>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="customer-email">
                    From CAC 2 (Statement of Share Capital)
                  </InputLabel>
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<FaCloudUploadAlt />}
                    className="bg-[#2C698D] hover:bg-[#204d67]"
                  >
                    Upload files
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(event) => console.log(event.target.files)}
                      multiple
                    />
                  </Button>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="customer-age">
                    Board resolution authorizing account opening
                  </InputLabel>
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<FaCloudUploadAlt />}
                    className="bg-[#2C698D] hover:bg-[#204d67]"
                  >
                    Upload files
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(event) => console.log(event.target.files)}
                      multiple
                    />
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid spacing={3}>
          <Grid item xs={12} md={8}>
            <h2 className="text-2xl font-semibold">
              Director/Shareholder Information
            </h2>
            <p className="mb-5">
              For each director and shareholder with &gt;5% ownership:
            </p>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="customer-firstName">
                    Full name
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="customer-firstName"
                    placeholder="Full Name"
                    {...getFieldProps("firstName")}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="customer-lastName">
                    Date of birth
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="customer-lastName"
                    placeholder="date of birth"
                    {...getFieldProps("lastName")}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="customer-email">Nationality</InputLabel>
                  <TextField
                    fullWidth
                    id="customer-email"
                    placeholder="Nationality"
                    {...getFieldProps("email")}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="customer-fatherName">
                    Residential Address
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="customer-fatherName"
                    placeholder="Residential address"
                    {...getFieldProps("fatherName")}
                    error={Boolean(touched.fatherName && errors.fatherName)}
                    helperText={touched.fatherName && errors.fatherName}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="customer-role">Phone Number</InputLabel>
                  <TextField
                    fullWidth
                    id="customer-role"
                    placeholder="Phone number"
                    {...getFieldProps("role")}
                    error={Boolean(touched.role && errors.role)}
                    helperText={touched.role && errors.role}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="customer-contact">
                    Email Address
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="customer-contact"
                    placeholder="Email Address"
                    {...getFieldProps("contact")}
                    error={Boolean(touched.contact && errors.contact)}
                    helperText={touched.contact && errors.contact}
                  />
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="customer-about">
                    BVN (Bank Verification Number)
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="customer-about"
                    placeholder="bvn"
                    {...getFieldProps("about")}
                    error={Boolean(touched.about && errors.about)}
                    helperText={touched.about && errors.about}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="customer-country">
                    Identification documents
                  </InputLabel>
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<FaCloudUploadAlt />}
                    className="bg-[#2C698D] hover:bg-[#204d67]"
                  >
                    Upload files
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(event) => console.log(event.target.files)}
                      multiple
                    />
                  </Button>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="customer-location">
                    Valid government ID (International passport/National
                    ID/Driver&apos;s license){" "}
                  </InputLabel>
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<FaCloudUploadAlt />}
                    className="bg-[#2C698D] hover:bg-[#204d67]"
                  >
                    Upload files
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(event) => console.log(event.target.files)}
                      multiple
                    />
                  </Button>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="customer-about">
                    Proof of address
                  </InputLabel>
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<FaCloudUploadAlt />}
                    className="bg-[#2C698D] hover:bg-[#204d67] hover:bg-[#204d67] "
                  >
                    Upload files
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(event) => console.log(event.target.files)}
                      multiple
                    />
                  </Button>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="customer-about">
                    Passport Photograph
                  </InputLabel>
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<FaCloudUploadAlt />}
                    className="bg-[#2C698D] hover:bg-[#204d67]"
                  >
                    Upload files
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(event) => console.log(event.target.files)}
                      multiple
                    />
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </main>
  );
};


export default Verify;

