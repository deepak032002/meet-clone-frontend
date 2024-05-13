"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
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
import { formSchema } from "@/lib/helper";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/api/axios.config";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const SignupTemplate = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
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
      },

      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        }
      },
    });
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="relative bg-white dark:bg-neutral-900 rounded-lg shadow">
        <div className="p-5">
          <h3 className="text-2xl mb-0.5 font-medium"></h3>
          <p className="mb-4 text-sm font-normal text-gray-800"></p>

          <div className="text-center">
            <p className="mb-3 text-2xl font-semibold leading-5 text-neutral-900 dark:text-neutral-50">
              Signup to your account
            </p>
            <p className="mt-2 text-sm leading-4 text-neutral-600">
              You must be signup in to perform this action.
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-2">
            <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-neutral-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
              <Image
                src="https://www.svgrepo.com/show/512317/github-142.svg"
                alt="GitHub"
                className="h-[18px] w-[18px]"
                width={32}
                height={32}
              />
              Continue with GitHub
            </button>

            <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-neutral-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
              <Image
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-[18px] w-[18px]"
                width={32}
                height={32}
              />
              Continue with Google
            </button>

            <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-neutral-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
              <Image
                src="https://www.svgrepo.com/show/448234/linkedin.svg"
                alt="Google"
                className="h-[18px] w-[18px]"
                width={32}
                height={32}
              />
              Continue with LinkedIn
            </button>
          </div>

          <div className="flex w-full items-center gap-2 py-6 text-sm text-neutral-600">
            <div className="h-px w-full bg-neutral-200"></div>
            OR
            <div className="h-px w-full bg-neutral-200"></div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full"
              autoComplete="off"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <Input
                        type="text"
                        className="h-full w-full focus-visible:ring-0 focus:outline-0"
                        placeholder="Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                    <FormMessage />
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
                    <FormMessage />
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
                    <FormMessage />
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
                    <FormMessage />
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
