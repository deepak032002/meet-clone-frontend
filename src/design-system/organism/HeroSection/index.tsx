import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  meetingCode: z
    .string()
    .min(12)
    .regex(/^[a-z]{3}-[a-z]{4}-[a-z]{3}$/, "Invalid ID format"),
});

const HeroSection: React.FC = () => {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      meetingCode: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (value: z.infer<typeof formSchema>) => {
    router.push(`/room/${value.meetingCode}`);
  };

  return (
    <div className="">
      <div className="dark:bg-transparent">
        <div className="mx-auto flex flex-col items-center py-12 sm:py-24">
          <div className="lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
            <h1 className=" w-[60%] text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl text-center font-black leading-10 text-white">
              Geek Connect: Where{" "}
              <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                Ideas
              </span>{" "}
              Meet Innovation.
            </h1>
            <p className="mt-5 sm:mt-10 lg:w-10/12 text-neutral-100 dark:text-neutral-300 font-normal text-center text-xl">
              Where Every Click Leads to Curiosity.
            </p>
          </div>
          <div className="flex w-1/2">
            <form
              {...form}
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full gap-2"
            >
              <Input
                type="text"
                placeholder="Meeting Code..."
                className="h-full w-full focus-visible:ring-0 focus:outline-0 dark:bg-white dark:text-black dark:focus-visible:outline-0 dark:focus-visible:ring-0 focus-visible:ring-offset-0"
                {...form.register("meetingCode")}
              />
              <Button
                type="submit"
                className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 hover:bg-gradient-to-tr active:bg-gradient-to-br duration-150 gap-2 dark:text-white text-lg font-semibold py-3 px-6 rounded-r-md h-full"
              >
                Join Meeting
              </Button>
            </form>
          </div>
          <div className="text-left w-1/2">
            {form.formState.errors.meetingCode && (
              <p className="text-red-600 text-sm">
                {form.formState.errors.meetingCode.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
