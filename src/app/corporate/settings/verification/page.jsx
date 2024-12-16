"use client";

import React from "react";
import { FormHelperText } from "@mui/material";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material";
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
// import { FaCloudUploadAlt } from "react-icons/fa";

import { useFormik } from "formik";
import _ from "lodash";
import * as Yup from "yup";

const Verify = () => {
  const allBusinessTypes = [
    { value: 3, label: "Sole Proprietorship" },
    { value: 1, label: "Limited Liability Company" },
    { value: 2, label: "Partnership" },
  ];

  const getInitialValues = () => {
    const newCustomer = {
      corporateName: "",
      rcNumber: "",
      tin: "",
      businessType: "",
      email: "",
      websiteUrl: "",
      industrySector: "",
      phoneNumber: "",
      businessAddress: "",
      operationalAddress: "",
      totalEmployees: "",
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
    corporateName: Yup.string()
      .max(255)
      .required("Registered Company Name is required"),
    rcNumber: Yup.string().max(255).required("Registered Number is required"),
    tin: Yup.string()
      .max(255)
      .required("Tax Identification number is required"),
    businessType: Yup.string().max(255).required("Business type is required"),
    websiteUrl: Yup.string().max(255).required("Website Url is required"),
    email: Yup.string()
      .max(255)
      .required("Email is required")
      .email("Must be a valid email"),
    phoneNumber: Yup.string().max(255).required("Phone Number is required"),
    businessAddress: Yup.string()
      .max(255)
      .required("Business address is required"),
    operationalAddress: Yup.string()
      .max(255)
      .required("Operational address is required"),
    totalEmployees: Yup.string().max(10).required("Total Employee is Required"),
    industrySector: Yup.string()
      .max(255)
      .required("Industry sector is required"),
    status: Yup.string().required("Status is required"),
  });
  const submitDetails = (values)=>{
    console.log(values)
    alert(values)
  }

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: CustomerSchema,
    enableReinitialize: true,
    onSubmit: submitDetails,
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
    <form onSubmit={handleSubmit} className="my-10 flex flex-col justify-center lg:px-10 items-center gap-y-10 w-full">
      <div className="">
        <Grid spacing={3}>
          <Grid item xs={12} md={8}>
            <h2 className="mb-5 text-2xl font-semibold">
              Basic Company Information
            </h2>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="corporateName">
                    Registered Company Name
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="corporateName"
                    placeholder="Registered Company Name"
                    {...getFieldProps("corporateName")}
                    error={Boolean(
                      touched.corporateName && errors.corporateName
                    )}
                    helperText={touched.corporateName && errors.corporateName}
                  />
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="rcNumber">Registered Number</InputLabel>
                  <TextField
                    fullWidth
                    id="rcNumber"
                    placeholder="Registered Number"
                    {...getFieldProps("rcNumber")}
                    error={Boolean(touched.rcNumber && errors.rcNumber)}
                    helperText={touched.rcNumber && errors.rcNumber}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="tin">
                    Tax Identification Number (TIN)
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="tin"
                    placeholder="Tax Identification Number (TIN)"
                    {...getFieldProps("tin")}
                    error={Boolean(touched.tin && errors.tin)}
                    helperText={touched.tin && errors.tin}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="businessType">Business Type</InputLabel>
                  <FormControl fullWidth>
                    <Select
                      id="businessType"
                      displayEmpty
                      {...getFieldProps("businessType")}
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
                              Select Type
                            </Typography>
                          );
                        }

                        const selectedBusinessType = allBusinessTypes.filter(
                          (item) => item.value === Number(selected)
                        );
                        return (
                          <Typography variant="subtitle2">
                            {selectedBusinessType.length > 0
                              ? selectedBusinessType[0].label
                              : "Pending"}
                          </Typography>
                        );
                      }}
                    >
                      {allBusinessTypes.map((column) => (
                        <MenuItem key={column.value} value={column.value}>
                          <ListItemText primary={column.label} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {touched.businessType && errors.businessType && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-email-login"
                      sx={{ pl: 1.75 }}
                    >
                      {errors.businessType}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="industrySector">
                    Industry Sector/Nature of Business
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="industrySector"
                    placeholder="Industry Sector/Nature of Business"
                    {...getFieldProps("industrySector")}
                    error={Boolean(
                      touched.industrySector && errors.industrySector
                    )}
                    helperText={touched.industrySector && errors.industrySector}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email">
                    Official Email Address
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="email"
                    placeholder="Official email address"
                    {...getFieldProps("email")}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="businessAddress">
                    Registered Business Address
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="businessAddress"
                    placeholder="Business Address"
                    {...getFieldProps("businessAddress")}
                    error={Boolean(
                      touched.businessAddress && errors.businessAddress
                    )}
                    helperText={
                      touched.businessAddress && errors.businessAddress
                    }
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="operationalAddress">
                    Operational Address
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="operationalAddress"
                    placeholder="Operational Address"
                    {...getFieldProps("operationalAddress")}
                    error={Boolean(touched.operationalAddress && errors.operationalAddress)}
                    helperText={touched.operationalAddress && errors.operationalAddress}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
                  <TextField
                    fullWidth
                    id="phoneNumber"
                    multiline
                    rows={1}
                    placeholder="Phone number"
                    {...getFieldProps("phoneNumber")}
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="websiteUrl">Website (if any)</InputLabel>
                  <TextField
                    fullWidth
                    id="websiteUrl"
                    multiline
                    rows={1}
                    placeholder="URL"
                    {...getFieldProps("websiteUrl")}
                    error={Boolean(touched.websiteUrl && errors.websiteUrl)}
                    helperText={touched.websiteUrl && errors.websiteUrl}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="totalEmployees">
                    Total Employees
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="totalEmployees"
                    multiline
                    rows={1}
                    placeholder="URL"
                    {...getFieldProps("totalEmployees")}
                    error={Boolean(
                      touched.totalEmployees && errors.totalEmployees
                    )}
                    helperText={touched.totalEmployees && errors.totalEmployees}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
              <Button>Submit</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid spacing={3}>
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
                    // startIcon={<FaCloudUploadAlt />}
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
                    // startIcon={<FaCloudUploadAlt />}
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
                    // startIcon={<FaCloudUploadAlt />}
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
                    // startIcon={<FaCloudUploadAlt />}
                    className="bg-[#2C698D] hover:bg-[#204d67] "
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
                    // startIcon={<FaCloudUploadAlt />}
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
        </Grid> */}
      </div>
    </form>
  );
};

export default Verify;

