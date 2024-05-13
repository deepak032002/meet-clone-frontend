"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGlobalContext } from "@/context/GlobalContext";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/api/axios.config";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const VerifyEmailTemplate = () => {
  const router = useRouter();
  const [isGetOtp, setIsGetOtp] = useState<boolean>(false);
  const formSchema = z
    .object({
      email: z.string().email(),
      otp: z.string().optional(),
    })
    .refine((arg) => {
      if (arg.otp) {
        return (
          new RegExp(REGEXP_ONLY_DIGITS_AND_CHARS).test(arg.otp) &&
          arg.otp.length === 6
        );
      } else {
        return true;
      }
    });

  const { data } = useGlobalContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: data.email || "",
      otp: "",
    },
  });

  const { mutate: mutateVerifyEmail, isPending: isPendingVerify } = useMutation(
    {
      mutationFn: async (data: z.infer<typeof formSchema>) =>
        axiosInstance.post("/user/verify-user", data),
    }
  );

  const { mutate: mutateGetOtp, isPending: isPendingGetOtp } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) =>
      axiosInstance.post("/user/get-otp", {
        email: data.email,
      }),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isGetOtp) {
      mutateGetOtp(values, {
        onSuccess: () => {
          setIsGetOtp(true);
          toast.success("Sent otp successful");
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            toast.error(error.response?.data.message);
          }
        },
      });
    } else {
      mutateVerifyEmail(values, {
        onSuccess: () => {
          form.reset();
          toast.success("Verify email successful");
          router.push("/login");
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            toast.error(error.response?.data.message);
          }
        },
      });
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="relative bg-white dark:bg-neutral-900 rounded-lg shadow">
        <div className="p-5">
          <h3 className="text-2xl mb-0.5 font-medium"></h3>
          <p className="mb-4 text-sm font-normal text-neutral-800"></p>

          <div className="text-center">
            <p className="mb-6 text-2xl font-semibold leading-5 text-neutral-900 dark:text-white">
              Verify to your account
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full"
              autoComplete="off"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <Input
                        type="text"
                        className="h-full w-full focus-visible:ring-0 focus:outline-0"
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isGetOtp && (
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                          {...field}
                          className="w-full text-dark"
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator>-</InputOTPSeparator>
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* {isGetOtp && (
                <Button
                  onClick={() => {
                    mutateGetOtp(
                      { email: form.getValues("email") },
                      {
                        onSuccess: () => {
                          toast.success("Sent otp successful");
                        },
                        onError: (error) => {
                          if (error instanceof AxiosError) {
                            toast.error(error.response?.data.message);
                          }
                        },
                      }
                    );
                  }}
                  variant={"link"}
                >
                  Resend Otp
                </Button>
              )} */}

              <Button
                type="submit"
                disabled={isPendingGetOtp || isPendingVerify}
                variant={"outline"}
                className="w-full"
              >
                {isPendingGetOtp || isPendingVerify
                  ? "Loading..."
                  : isGetOtp
                  ? "Verify"
                  : "Send Otp"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailTemplate;
