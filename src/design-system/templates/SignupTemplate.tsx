"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "@/lib/helper";
import axiosInstance from "@/api/axios.config";
import { useFileUpload } from "@/hooks/useFileUpload";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

const SignupTemplate = () => {
  const {
    mutate: uploadFile,
    progress,
    setProgress,
    isPending: isUploading,
  } = useFileUpload();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      mobile: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) =>
      axiosInstance.post("/user/signup", data),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values, {
      onSuccess: () => {
        form.reset();
        toast.success("Signup successful");
        router.push("/login");
      },

      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        }
      },
    });
  }

  return (
    <div className="h-full flex justify-center items-center">
      <div className="relative bg-white dark:bg-neutral-900 rounded-lg shadow sm:w-[500px] w-full">
        <div className="p-5">
          <h3 className="text-2xl mb-0.5 font-medium"></h3>
          <p className="mb-4 text-sm font-normal text-gray-800"></p>

          <div className="text-center">
            <p className="mb-3 text-2xl font-semibold leading-5 text-neutral-900 dark:text-neutral-50">
              Signup to your account
            </p>
            <p className="mt-2 text-sm leading-4 text-neutral-600">
              Signup to your account to get start
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-2">
            <Button className="gap-2" variant={"outline"}>
              <Image
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-[18px] w-[18px]"
                width={32}
                height={32}
              />
              Continue with Google
            </Button>
          </div>

          <div className="flex w-full items-center gap-2 py-6 text-sm text-neutral-600">
            <div className="h-px w-full bg-neutral-200 dark:bg-neutral-700"></div>
            OR
            <div className="h-px w-full bg-neutral-200 dark:bg-neutral-700"></div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full"
              autoComplete="off"
            >
              <div className="flex gap-2 items-start">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormControl>
                        <Input
                          type="text"
                          className="h-full w-full focus-visible:ring-0 focus:outline-0"
                          placeholder="First Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs dark:text-red-600" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormControl>
                        <Input
                          type="text"
                          className="h-full w-full focus-visible:ring-0 focus:outline-0"
                          placeholder="Last Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs dark:text-red-600" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <Input
                        type="email"
                        className="h-full w-full focus-visible:ring-0 focus:outline-0"
                        placeholder="Email Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs dark:text-red-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <Input
                        type="tel"
                        className="h-full w-full focus-visible:ring-0 focus:outline-0"
                        placeholder="Mobile"
                        maxLength={10}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs dark:text-red-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <div>
                        {field.value ? (
                          <div className="flex gap-2 items-center">
                            <Input disabled value={field.value} />
                            <Button
                              type="button"
                              onClick={() => {
                                field.onChange("");
                                setProgress(0);
                              }}
                              variant={"outline"}
                            >
                              <XIcon size={18} />
                            </Button>
                          </div>
                        ) : (
                          <Input
                            type="file"
                            className="h-full w-full focus-visible:ring-0 focus:outline-0"
                            maxLength={10}
                            accept=".png,.jpg,.jpeg"
                            {...field}
                            onChange={(e) => {
                              if (e.target.files) {
                                if (e.target.files[0].size > 2000000) {
                                  form.setError("image", {
                                    message: "File too large. Max size 2MB",
                                  });
                                  return;
                                } else {
                                  form.clearErrors("image");
                                }
                                uploadFile(e.target.files[0], {
                                  onSuccess: (url) => {
                                    field.onChange(url.data.secure_url);
                                  },
                                });
                              }
                            }}
                          />
                        )}
                        {progress && isUploading ? (
                          <Progress
                            value={progress}
                            className="w-full h-1 mt-2"
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs dark:text-red-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <Input
                        type="password"
                        className="h-full w-full focus-visible:ring-0 focus:outline-0"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs dark:text-red-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <Input
                        type="password"
                        className="h-full w-full focus-visible:ring-0 focus:outline-0"
                        placeholder="Confirm password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs dark:text-red-600" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isPending}
                variant={"outline"}
                className="w-full"
              >
                {isPending ? "Loading..." : "Continue"}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm text-neutral-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-[#4285f4]">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupTemplate;
