import React from 'react';
import { TextField, Typography, Checkbox, FormControlLabel } from '@material-ui/core';
import ButtonLoading from 'components/common/ButtonLoading';
import { FormStoreContainer } from 'pages/login';
import { Controller } from 'react-hook-form';

export default function Index({ submit }) {
  const {
    isLoading,
    handleSubmit,
    control,
    formState: { errors },
  } = FormStoreContainer.useContainer();

  return (
    <div className="bg-gray-200 h-full w-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit(submit)}
        className="rounded-xl flex flex-col bg-white shadow-lg max-w-[30rem] md:h-full"
      >
        <div className="rounded-xl py-8 px-5 md:rounded-none" style={{ boxShadow: `inset 0 5px 0 0 #dd6b20` }}>
          <Typography color="primary" align="center" variant="h4" className="font-bold">
            CMS
          </Typography>
          <Typography align="center" variant="h6" className="mt-3">
            Access Your Account
          </Typography>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => {
              return (
                <TextField
                  error={!!errors.email}
                  variant="outlined"
                  label={errors.email?.message || 'email'}
                  placeholder="Enter email"
                  size="small"
                  className="mt-10"
                  fullWidth
                  {...field}
                />
              );
            }}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                type="password"
                variant="outlined"
                label={errors.password?.message || 'password'}
                placeholder="Enter password"
                size="small"
                error={!!errors.password}
                className="mt-5"
                fullWidth
                {...field}
              />
            )}
          />

          <Controller
            name="remember"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControlLabel control={<Checkbox {...field} />} label="Remember me" className="mt-3" />
            )}
          />

          <ButtonLoading
            messageLoading="Processing..."
            isLoading={isLoading}
            variant="contained"
            color="primary"
            type="submit"
            className="rounded-3xl block mx-auto mt-5 px-5"
          >
            Login
          </ButtonLoading>
          <Typography variant="h6" className="mt-6 text-sm cursor-pointer" align="right">
            Forgot your password?
          </Typography>
        </div>
      </form>
    </div>
  );
}
